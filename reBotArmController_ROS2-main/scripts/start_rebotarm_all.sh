#!/usr/bin/env bash
set -Eeuo pipefail

# One-key ROS2 startup for reBotArm. Press Ctrl+C to stop every launch safely.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
WORKSPACE_DIR="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"

SERIAL_CHANNEL="${SERIAL_CHANNEL:-/dev/ttyACM0}"
ROSBRIDGE_PORT="${ROSBRIDGE_PORT:-9090}"
ROSBRIDGE_ADDRESS="${ROSBRIDGE_ADDRESS:-0.0.0.0}"
USE_RVIZ="${USE_RVIZ:-true}"

PIDS=()
NAMES=()
SHUTTING_DOWN=0

log() {
  printf '[rebotarm-start] %s\n' "$*"
}

source_ros_environment() {
  if [[ -f "${WORKSPACE_DIR}/install/setup.bash" ]]; then
    # shellcheck source=/dev/null
    set +u
    source "${WORKSPACE_DIR}/install/setup.bash"
    set -u
    log "sourced workspace: ${WORKSPACE_DIR}/install/setup.bash"
  fi

  if [[ -z "${ROS_DISTRO:-}" ]]; then
    local setup_file
    for setup_file in /opt/ros/*/setup.bash; do
      if [[ -f "${setup_file}" ]]; then
        # shellcheck source=/dev/null
        set +u
        source "${setup_file}"
        set -u
        log "sourced ROS: ${setup_file}"
        break
      fi
    done
  fi

  if ! command -v ros2 >/dev/null 2>&1; then
    log "ros2 command not found. Source your ROS2 environment first, or build/source this workspace."
    exit 1
  fi
}

start_launch() {
  local name="$1"
  shift

  log "starting ${name}: $*"
  "$@" &
  PIDS+=("$!")
  NAMES+=("${name}")
}

is_running() {
  local pid="$1"
  kill -0 "${pid}" >/dev/null 2>&1
}

stop_all() {
  local reason="${1:-shutdown}"

  if [[ "${SHUTTING_DOWN}" -eq 1 ]]; then
    return
  fi
  SHUTTING_DOWN=1

  log "${reason}; sending SIGINT to ROS launch processes..."
  for pid in "${PIDS[@]}"; do
    if is_running "${pid}"; then
      kill -INT "${pid}" >/dev/null 2>&1 || true
    fi
  done

  local deadline=$((SECONDS + 12))
  while (( SECONDS < deadline )); do
    local any_running=0
    for pid in "${PIDS[@]}"; do
      if is_running "${pid}"; then
        any_running=1
        break
      fi
    done
    [[ "${any_running}" -eq 0 ]] && break
    sleep 1
  done

  for pid in "${PIDS[@]}"; do
    if is_running "${pid}"; then
      log "process ${pid} did not stop after SIGINT; sending SIGTERM..."
      kill -TERM "${pid}" >/dev/null 2>&1 || true
    fi
  done

  wait "${PIDS[@]}" >/dev/null 2>&1 || true
  log "all launch processes stopped."
}

trap 'stop_all "Ctrl+C received"; exit 130' INT
trap 'stop_all "termination signal received"; exit 143' TERM
trap 'stop_all "script exiting"' EXIT

source_ros_environment

start_launch "fake bringup" \
  ros2 launch rebotarm_bringup fake_bringup.launch.py

start_launch "rosbridge websocket" \
  ros2 launch rosbridge_server rosbridge_websocket_launch.xml \
    port:="${ROSBRIDGE_PORT}" \
    address:="${ROSBRIDGE_ADDRESS}"

start_launch "hardware bringup" \
  ros2 launch rebotarm_bringup bringup.launch.py \
    channel:="${SERIAL_CHANNEL}" \
    use_rviz:="${USE_RVIZ}"

log "startup complete."
log "Ctrl+C will safely stop fake bringup, rosbridge, hardware bringup, and RViz."

while true; do
  for index in "${!PIDS[@]}"; do
    pid="${PIDS[${index}]}"
    if ! is_running "${pid}"; then
      status=0
      name="${NAMES[${index}]}"
      wait "${pid}" || status="$?"
      log "${name} exited with status ${status}; stopping the remaining processes."
      stop_all "${name} exited"
      exit "${status}"
    fi
  done
  sleep 1
done
