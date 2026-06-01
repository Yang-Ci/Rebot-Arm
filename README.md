
# 🦾 reBot-DevArm: Open Source Robotic Arm for All Developers

<p align="center">
  <img src="./media/v1.0.png" alt="reBot-DevArm Banner">
</p>

<p align="center">
    <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-CERN--OHL--W--2.0--for--hardware-green.svg" alt="License: CERN-OHL-W-2.0">
    </a>
    <img src="https://img.shields.io/badge/License-Apache--2.0--for--software-pink.svg" alt="License: Apache-2.0">
    </a>
    <img src="https://img.shields.io/badge/Commercial-Contact%20Us-red.svg" alt="yaohui.zhu@seeed.cc">
    <img src="https://img.shields.io/badge/ROS-Noetic%20%7C%20Humble-orange.svg" alt="ROS Support">
    <img src="https://img.shields.io/badge/Framework-LeRobot-yellow.svg" alt="LeRobot">
    <img src="https://img.shields.io/badge/Framework-Isaac Sim-yellow.svg" alt="LeRobot">
</p>

<p align="center">
  <strong>🚀 100% Open Source · Embodied AI · Full Hardware + Software Stack</strong>
</p>

<p align="center">
  <strong>📦 Build your own robotic arm · 🧠 Learn robotics · 🏭 Deploy real applications</strong>
</p>


<table align="center">
  <tr>
    <td>
      <a href="https://www.youtube.com/watch?v=ONbpv3seiG8">
        <img src="https://img.icons8.com/ios-filled/100/ff0000/youtube-play.png" width="40">
      </a>
    </td>
    <td>
      <a href="https://www.youtube.com/watch?v=ONbpv3seiG8">
        About The reBot Arm
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <strong>
    <a href="./README_zh.md">简体中文</a> &nbsp;|&nbsp;
    <a href="./README.md">English</a> &nbsp;|&nbsp;
    <a href="./README_JP.md">日本語</a>&nbsp;|&nbsp;
    <a href="./README_Fr.md">français</a>&nbsp;|&nbsp;
    <a href="./README_es.md">Español</a>
  </strong>
</p>

<p align="center">
<a href="https://discord.gg/AbGuqJhDpQ">
    <img src="https://img.shields.io/discord/1409155673572249672?color=7289DA&label=Discord&logo=discord&logoColor=white"></a>
<a href="https://wiki.seeedstudio.com/robotics_page/">  
    <img src="https://img.shields.io/badge/Documentation-📕-blue" alt="robotics wiki"></a>
</p>


## 📖 Introduction

**reBot-DevArm (reBot Arm B601 DM and reBot Arm B601 RS)** is a robotic arm project dedicated to lowering the barrier to learning Embodied AI. We focus on **"True Open Source"** — not just the code, we unreservedly open source everything:
- 🦾 **Two versions of the robotic arm**：We will provide all open-source files for two versions of the robotic arm with the same appearance: **Robostride** and **Damiao**.
- 🛠️ **Hardware Blueprints**: Source files for sheet metal parts and 3D printed parts.
- 🔩 **BOM List**: Detailed down to the specifications and purchase links for every single screw.
- 💻 **Software & Algorithms**: Python SDK, ROS1/2, Isaac Sim, LeRobot, etc.

## Get Your Own reBot Arm

- We offer five kit options  at  [Seeedstudio.com](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html) :
  - **Arm Body Motor Kit**: Includes only motors and wiring harnesses for the robotic arm.
  - **Arm Body Structural Kit**: Includes only mechanical structural components.
  - **Gripper Complete Kit**: Includes motors, wiring harnesses and structural components for the gripper.
  - **Full Kit**: Includes the complete set of the robotic arm body and gripper.
  - **Pre‑assembled Robotic Arm**: Fully assembled finished robotic arm.

- You can also purchase the [Leader Arm](https://www.seeedstudio.com/Star-Arm-102-p-6765.html?qid=P2U7IG_yskyak5m_1776415593315)

## 🗺️ Roadmap & Status

We are committed to continuously maintaining and adapting to mainstream robot development ecosystems. Below is our current adaptation progress and planned release schedule:

### reBot Arm B601 DM
| Supported Ecosystem | Status | Description / Estimated Release Date | Related Documentation |
| :--- | :---: | :--- | :--- |
| **Basic Motor Usage** | ✅ Completed | Basic motion control and API encapsulation | [Damiao Technology](https://wiki.seeedstudio.com/cn/damiao_series/) |
| **Open-Sourcing of the New STEP 3D Structural Parts and BOM** | ✅ Completed | STEP files for all parts in the new version, parts BOM, and reference prices for all machined components | [reBot Arm B601-DM BOM](./hardware/reBot_B601_DM/readme.md) |
| **Reference for Real Machine Performance Testing** | ✅ Completed   | Performance Reference of Robotic Arm under Normal and Extreme Operating Conditions |[Performance Testing](./hardware/reBot_B601_DM/performance_testing/Performance_Testing.md) |
| **Assembly Video** | ✅ Completed | Ultra-detailed assembly steps and video | [Getting Started with reBot Arm B601-DM](https://wiki.seeedstudio.com/rebot_b601_dm_getting_started/) |
| **Python SDK** | ✅Continuously optimized, PRs welcome | One-stop integration of motor read/write and control for Robstride, Damiao, Mota, Gaoqing, Hexfellow and other motors. | [Getting Started with Motorbridge](https://motorbridge.seeedstudio.com) and [Web UI](https://rebot-devarm.w0x7ce.eu/)|
| **ROS2 Integration** | ✅ Completed | ROS2 integrated reBot Arm controller with support for kinematics, trajectory planning, and gravity compensation | [reBot Arm B601-DM ROS2 Integration Guide](https://wiki.seeedstudio.com/rebot_arm_b601_dm_ros2_integration/) |
| **Pinocchio Integration** |  ✅ Completed  | Adaptation to the Pinocchio framework, enabling forward/inverse kinematics and gravity compensation for the robotic arm | [Getting Started with Pinocchio for reBot Arm B601-DM](https://wiki.seeedstudio.com/rebot_arm_b601_dm_pinocchio_meshcat/) and [Github repo](https://github.com/vectorBH6/reBotArm_control_py) |
| **Isaac Sim Simulation** | 🚧 In Progress  | Import USD models and enable simulated teleoperation | [delay for add additional courses: 2026.06.20] |
| **LeRobot Integration** | ✅ Completed  | Adaptation to the Hugging Face LeRobot training framework | [Getting Started with LeRobot-based reBot Arm](https://wiki.seeedstudio.com/rebot_arm_b601_dm_lerobot/) |
| **Depth Camera Integration** | ✅ Completed  | Visual Grasping Demonstration Based on YOLO and Depth Camera | [Getting Started with Visual Grasping Demo](https://wiki.seeedstudio.com/rebot_arm_b601_dm_grasping_demo/) |
| **Gradual Updates of the Latest Algorithms** | ⏳ Planned | Mainstream algorithms will be updated progressively | Ongoing |
| **Launch of a Series of Completely Free Courses** | ⏳ Planned | Mainstream algorithms will be updated progressively | Ongoing |


### reBot Arm B601 RS

| Supported Ecosystem | Status | Description / Estimated Release Date | Related Documentation |
| :--- | :---: | :--- | :--- |
| **Basic Motor Usage** | ✅ Completed | Basic motion control and API encapsulation | [Robstride](https://wiki.seeedstudio.com/cn/robstride_control/) |
| **Open-Sourcing of the New STEP 3D Structural Parts and BOM** | 🚧 In Progress | STEP files for all parts in the new version, parts BOM, and reference prices for all machined components | Expected [2026.05] |
| **Assembly Video** | 🚧 In Progress | Ultra-detailed assembly steps and video | [Expected 2026.05] |
| **ROS2 (Humble)** | ⏳ Planned | Core drivers have been completed, and MoveIt2 is currently being optimized | [Expected 2026.05] |
| **LeRobot Integration** | ⏳ Planned | Adaptation to the Hugging Face LeRobot training framework | [Expected 2026.05] |
| **Pinocchio Integration** | ⏳ Planned | Adaptation to the Pinocchio framework, enabling forward/inverse kinematics and gravity compensation for the robotic arm | [Expected 2026.05] |
| **Isaac Sim Simulation** | ⏳ Planned | Import USD models and enable simulated teleoperation | [Expected 2026.05] |
| **Gradual Updates of the Latest Algorithms** | ⏳ Planned | Mainstream algorithms will be updated progressively | Ongoing |
| **Launch of a Series of Completely Free Courses** | ⏳ Planned | Mainstream algorithms will be updated progressively | Ongoing |

---

## ⚙️ Hardware Specifications

reBot-DevArm is designed for desktop Embodied AI applications, balancing payload capacity with flexibility.

| Parameter | reBot Arm B601-DM |
| :--- | :--- |
| **Recommended Continuous Payload** | Less than 1.5 kg within 70% of arm reach workspace |
| **Recommended Payload** | **1.5 kg** |
| **Max Reach** | **650 mm** |
| **Weight** | Approx. 4.5 kg |
| **Repeatability** | < 0.2 mm |
| **Degrees of Freedom (DOF)** | 6 DOF + 1 Gripper (Open source CAN servo gripper and joint motor gripper coming soon) |
| **Supported Platforms/Ecosystems** | ROS1, ROS2, LeRobot, Pinocchio, Isaac Sim, Python SDK |
| **Supply Voltage** | DC 24V |

## 🧹Optional Hardware
###  Wirst Camera Mount
| 32×32 UVC  | Intel D435i | Intel D405 & Gemini 305 | Gemini 2|
| --- | --- | --- | --- | 
| <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/UVC_camera_mount.png" height="100"> | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D435i.jpg" height="100"> |  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D405.jpg" height="100"> | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Gemini2.jpg" height="100"> | 
| [STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/UVC32_mount.step) | [STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) | [STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D405_305_Mount.step) |[STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) |

###  Compatible with Leader Arm
| Star Arm 102-LD  |  Open to compatibility integration  | 
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/star_arm_102.jpg" height="100">  |Comming soon| 
|  [Github repo](https://github.com/servodevelop/Star-Arm-102) |Comming soon |

### DIY Finger
| Soft Finger  |  Open to compatibility integration  | 
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Soft_Finger.png" height="100">  |Comming soon| 
| [Finger Mount(ABS/PLA)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Mount.step) and [Finger (TPU 95+)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Finger.step)  |Coming soon |


---

### 🎓 Full-Stack Robotics Ecosystem
reBot-DevArm is not just a robotic arm, but a robotics learning community. We share the following general tutorials for free:

#### 🖥️ Edge Computing & Master Control
*   [![Jetson](https://img.shields.io/badge/NVIDIA-reComputer%20Jetson-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://wiki.seeedstudio.com/NVIDIA_Jetson/) —— **AI Inference & Compute Core**
*   [![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-4B%20%2F%205-C51A4A?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white)](https://wiki.seeedstudio.com/raspberry-pi-devices/) —— **General Linux Development Environment**
*   [![ESP32](https://img.shields.io/badge/MCU-Seeed%20XIAO%20(ESP32)-0091BD?style=for-the-badge&logo=espressif&logoColor=white)](https://wiki.seeedstudio.com/SeeedStudio_XIAO_Series_Introduction/) —— **Low-power Wireless Control Node**

#### 📡 Sensors & Peripherals
*   **🚗 Motors & Servos**: [Damiao / Gogo / Robstride / Mita / Feite / Fashion Star](https://wiki.seeedstudio.com/robotics_page/)
*   **👁️ Visual Perception**: [Depth Cameras / LiDAR / Vision Algorithms](https://wiki.seeedstudio.com/robotics_page/)
*   **👂 Auditory Interaction**: [ReSpeaker Mic Arrays / Speech Recognition](https://wiki.seeedstudio.com/ReSpeaker_Mic_Array_v2.0/)
*   **🧭 Motion & Attitude**: [IMU (6-axis/9-axis) / Gyroscopes / Magnetometers](https://wiki.seeedstudio.com/Sensor/IMU/)
*   **🤖 Comprehensive Kits**: [More Robotics Sensors & Driver Examples](https://wiki.seeedstudio.com/robotics_page/)


> 👉 **[Click to Enter Wiki Knowledge Base](https://wiki.seeedstudio.com/)** (All tutorials are free to view)

---

## 🙌 References & Acknowledgments
The path of open source is never lonely. The birth of the reBot-DevArm project would not be possible without the full support of Seeed Studio, the global open source community, and excellent hardware partners. We pay our highest respects to the following projects and teams:

### 🌍 Ecosystem & Software Support
*   **[Seeed Studio](https://www.seeedstudio.com/)** - Providing comprehensive hardware supply chain and technical support.
*   **[Hugging Face LeRobot](https://github.com/huggingface/lerobot)** - An excellent end-to-end robot learning framework.
*   **[NVIDIA Isaac Sim](https://developer.nvidia.com/isaac/sim)** - A powerful robot simulation and synthetic data platform.

### ⚙️ Core Hardware Partners
Thanks to the following manufacturers for providing high-performance motor and actuator solutions:
*   **[Damiao Technology](https://www.damiaokeji.com/)**
*   **[Robstride](https://robstride.com/)**
*   **[Fashion Star](https://fashionstar.com.hk/wiki/)**

### 💡 Inspiration
This project is deeply inspired by the following excellent open source projects:
*   **[SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100/tree/main)**
*   **[Mobile ALOHA](https://github.com/tonyzhaozh/aloha)**
*   **[Dummy-Robot (Zhihui Jun)](https://github.com/peng-zhihui/Dummy-Robot)**
*   **[OpenArm](https://openarm.dev/)**
*   **[I2RT](https://i2rt.com/)**
*   **[TRLC-DK1](https://github.com/robot-learning-co/trlc-dk1)**

### 🎃 Prototype Contributors
- **SeeedStudio AI Robotics Team's**: Yaohui Zhu (yaohui.zhu@seeed.cc)
- **SeeedStudio STU**: Wentao Dong
- **SeeedStudio STU**: Weiwei Xu
- **SeeedStudio Purchasing Department**: Fengqun Peng


### 👥 Contributors

## Our Top Contributors 
<p align="center"><a href="https://github.com/Seeed-Projects/reBot-DevArm/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Seeed-Projects/reBot-DevArm" />
</a></p>



*Coming soon... Welcome to submit PRs to become a contributor!*

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Seeed-Projects/reBot-DevArm&type=date&legend=top-left)](https://www.star-history.com/#Seeed-Projects/reBot-DevArm&type=date&legend=top-left)

# reBot-DevArm Project License

- **Hardware Design** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), open-sourced under [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)
- **Firmware Code** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), open-sourced under [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Rights and Restrictions

Dear developers and industry experts, the reBot Arm robotic arm project has always adhered to the core philosophy of **Agility, Openness, Responsibility, and Symbiosis** to serve the developer community. Our vision is to enable every enthusiast to systematically master the hardware architecture and software principles of robotic arms, and to gain an immersive experience with cutting-edge embodied intelligence algorithms through the reBot project.

For the first five months since launch, the project has been using the **CC BY-SA NC (Non-Commercial) open source license**. The original intention was to allow all developers and contributors to focus on iterating and improving the product during its initial, less mature phase, free from commercial concerns, and to fully dedicate themselves to project co-construction and optimization.

After months of in-depth product polishing and technical refinement by Seeed Studio, **effective May 11, 2026**, the reBot Arm project has officially transitioned from the CC BY-SA NC license to the **CERN-OHL-W 2.0 open source license**.

From this point forward, the project achieves **100% full-stack open source (both hardware and software), granting full commercial compliance and usage rights for all scenarios**.

We look forward to your continued participation with an inclusive and collaborative spirit, to sustain, maintain, and deepen the reBot Arm open source community, to share the fruits of open source, and together build an ecosystem for embodied intelligence.

This project uses different open source licenses for Hardware and Software. Please confirm the license terms applicable to the part you are using.

| Item / License                          | reBot Hardware: CERN-OHL-W-2.0                              | reBot Software SDK: Apache-2.0                              |
| --------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| **✅ Commercial Use Allowed**           | ✅ Allowed                                                  | ✅ Allowed                                                  |
| **✅ Modification Allowed**             | ✅ Allowed                                                  | ✅ Allowed                                                  |
| **✅ Redistribution Allowed**           | ✅ Allowed                                                  | ✅ Allowed                                                  |
| **✅ Closed-source Integration/Redistribution** | ❌ Conditional (see [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) for details) | ✅ Allowed (no need to disclose modified code)              |
| **⚠️ Copyright Retention Required**     | ✅ Required                                                 | ✅ Required                                                 |
| **⚠️ License Text Retention Required**  | ✅ Required                                                 | ✅ Required                                                 |
| **⚠️ Modification Notice Required**     | ✅ Required (with date and description)                     | ✅ Required (with modification description)                 |
| **⚠️ Patent Grant**                     | ✅ Explicit patent grant (see [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) for details) | ✅ Explicit patent grant                                    |
| **⚠️ Source Provision upon Distribution** | ✅ **Must** provide hardware "Complete Source"              | ❌ No mandatory source provision requirement                |
| **⚠️ External/Closed Module Compatibility** | ✅ Allowed (Weakly Reciprocal feature)                    | ✅ Fully allowed                                            |
| **🔗 Relationship with Other Components/Modules** | Independent interface modules (External Material) may retain original closed license | No restrictions, can link with code under any license      |
| **📄 Official License Full Text**       | [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)       | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)   |

## ☎ Contact Us
- **Open‑Source Progress & Technical Support**-Yaohui: yaohui.zhu@seeed.cc
- **Future Collaboration & Customization**-Elaine: elaine.wu@seeed.cc
