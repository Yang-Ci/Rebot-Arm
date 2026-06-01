# reBotArm ROS2 SDK

版本：`v0.0.2`

中文完整使用说明见 [README_zh.md](README_zh.md)。

## ROS 端一键启动脚本

脚本位置：

```bash
scripts/start_rebotarm_all.sh
```

该脚本会在一个终端中同时启动下面三个 ROS2 launch：

```bash
ros2 launch rebotarm_bringup fake_bringup.launch.py
ros2 launch rosbridge_server rosbridge_websocket_launch.xml port:=9090 address:=0.0.0.0
ros2 launch rebotarm_bringup bringup.launch.py channel:=/dev/ttyACM0 use_rviz:=true
```

按下 `Ctrl+C` 退出时，脚本会先向所有 `ros2 launch` 进程发送 `SIGINT`，
等待 ROS 正常关闭；如果超时仍未退出，才会发送 `SIGTERM`，避免残留节点或
串口资源没有释放。

## 使用方法

进入 ROS2 工作区：

```bash
cd reBotArmController_ROS2-main
chmod +x scripts/start_rebotarm_all.sh
./scripts/start_rebotarm_all.sh
```

如果工作区还没有编译：

```bash
cd reBotArmController_ROS2-main
colcon build
source install/setup.bash
chmod +x scripts/start_rebotarm_all.sh
./scripts/start_rebotarm_all.sh
```

脚本启动时会自动尝试加载：

```bash
install/setup.bash
```

如果没有找到工作区环境，并且当前终端还没有加载 ROS2，脚本也会尝试加载：

```bash
/opt/ros/*/setup.bash
```

## 可选参数

可以通过环境变量修改默认配置：

```bash
SERIAL_CHANNEL=/dev/ttyACM0 \
ROSBRIDGE_PORT=9090 \
ROSBRIDGE_ADDRESS=0.0.0.0 \
USE_RVIZ=true \
./scripts/start_rebotarm_all.sh
```

默认值如下：

- `SERIAL_CHANNEL=/dev/ttyACM0`
- `ROSBRIDGE_PORT=9090`
- `ROSBRIDGE_ADDRESS=0.0.0.0`
- `USE_RVIZ=true`

## 注意事项

- 请在 ROS2/Linux 环境中运行该脚本。
- 如果真实机械臂串口不是 `/dev/ttyACM0`，请用 `SERIAL_CHANNEL` 修改。
- `rosbridge_server` 需要已经安装，否则 rosbridge websocket 启动会失败。
- 当前脚本会按你的要求同时启动 fake bringup 和真实硬件 bringup；如果后续发现节点名或话题冲突，可以按实际使用场景拆成仿真模式和真机模式。
