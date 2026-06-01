# reBot Arm B601-DM Simulator

Standalone web simulator for the ROS2 reBot Arm B601-DM model.

The UI models the arm as 6 URDF joints plus the configured gripper actuator
from `gripper.yaml` (`motor_id: 0x07`). The current ROS2 URDF ends at
`end_link`, so the web simulator adds a lightweight visual gripper at the tool
end and drives it from 0-90 mm, matching the ROS2 demo values:

```text
close: 0.00 m
open:  0.09 m
```

## Run

```bash
npm start
```

Then open:

```text
http://localhost:3001
```

## Android PWA install

Desktop browsers can install from `http://localhost:3001` because `localhost`
is treated as a secure origin. Android phones usually open the same app through
the LAN address, for example `http://192.168.x.x:3001`; that is not a secure
origin, so Edge/Chrome will disable Service Worker and the page cannot be
installed as a full PWA.

For Android installation, serve the panel through HTTPS. Also keep the ROS
connection scheme aligned with the page:

```text
HTTPS page -> use wss:// for rosbridge, or proxy rosbridge through the same HTTPS origin
HTTP page  -> ws:// works for LAN testing, but full PWA installation is unavailable
```

For quick testing on a phone, the HTTP LAN page is still usable as a normal web
control panel. For an installable app-like PWA, put the panel behind a trusted
HTTPS endpoint and expose rosbridge as `wss://...`.

### Local HTTPS on Windows

Generate a local development certificate:

```powershell
npm run cert:dev
```

The certificate is bound to the LAN IP printed by the script. If your phone uses
a different computer IP, regenerate it explicitly:

```powershell
pwsh -ExecutionPolicy Bypass -File scripts/create-dev-cert.ps1 -HostIp 192.168.x.x
```

Start the HTTPS server:

```powershell
npm run start:https
```

Then open the LAN URL printed by the server, for example:

```text
https://192.168.x.x:3443
```

If Android says the connection is not secure, the phone does not trust the local
certificate yet. Copy `.certs/rebotarm-local-root-ca.cer` to the phone and
install it as a trusted CA certificate in Android settings, then reopen the HTTPS
URL. Without this trust step, the page can open only after a warning and it still
does not count as a secure PWA origin.

Treat that root certificate like a development key: install only the one you
generated yourself, use it only on your own LAN, and remove it from the phone
when you no longer need this local PWA.

## ROS2 bridge to Ubuntu VM

Default WebSocket target:

```text
ws://192.168.60.128:9090
```

On Ubuntu 24.04 + ROS2 Jazzy, start the ROS side:

```bash
source /opt/ros/jazzy/setup.bash
cd ~/reBotArmController_ROS2-main
colcon build --symlink-install
source install/setup.bash
ros2 launch rebotarm_bringup fake_bringup.launch.py
```

In another Ubuntu terminal, start rosbridge:

```bash
source /opt/ros/jazzy/setup.bash
source ~/reBotArmController_ROS2-main/install/setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml port:=9090 address:=0.0.0.0
```

From Windows, open the simulator and click `连接 ROS`. Keep `允许网页向真实机械臂发控制` off until the fake driver mirrors correctly.

The simulator reads the ROS2 model from:

```text
../reBotArmController_ROS2-main/src/rebotarm_bringup/description/urdf/reBot-DevArm_fixend.urdf
../reBotArmController_ROS2-main/src/rebotarm_bringup/description/meshes
```


Set-Location e:\reBot-DevArm-main\reBotArm_simulator; node server.js
