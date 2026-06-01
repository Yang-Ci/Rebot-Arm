# 🦾 reBot-DevArm: Brazo Robótico de Código Abierto para Todos los Desarrolladores

<p align="center">
  <img src="./media/v1.0.png" alt="Banner de reBot-DevArm">
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
  <strong>100% Totalmente de Código Abierto · IA Corpórea · Integración Hardware-Software · Gratis para uso personal/educativo · El uso comercial requiere autorización</strong>
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
    <img src="https://img.shields.io/badge/Documentation-📕-blue" alt="wiki de robótica"></a>
</p>


## 📖 Introducción

**reBot-DevArm (reBot Arm B601 DM y reBot Arm B601 RS)** es un proyecto de brazo robótico dedicado a reducir la barrera de aprendizaje de la IA Corpórea. Nos enfocamos en el **"Verdadero Código Abierto"** — no solo el código, abrimos todo sin reservas:

* 🦾 **Dos versiones del brazo robótico**：Proporcionaremos todos los archivos de código abierto para dos versiones del brazo robótico con la misma apariencia: **Robostride** y **Damiao**。
* 🛠️ **Planos de hardware**: Archivos fuente de piezas de chapa metálica y piezas impresas en 3D。
* 🔩 **Lista BOM**: Detallada hasta las especificaciones y enlaces de compra de cada tornillo。
* 💻 **Software y algoritmos**: Python SDK, ROS1/2, Isaac Sim, LeRobot, etc。

## Consigue tu propio brazo reBot Arm

- Ofrecemos cinco versiones de kits [Seeedstudio.com](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html):
  - **Kit de motor del brazo**: incluye solo motores y cableado del brazo robótico.
  - **Kit estructural del brazo**: incluye solo componentes mecánicos estructurales.
  - **Kit completo de pinza (gripper)**: incluye motor, cableado y componentes estructurales de la pinza.
  - **Kit completo**: brazo robótico + pinza.
  - **Brazo ensamblado**: brazo robótico preensamblado.

- También puedes comprar el [Leader Arm](https://www.seeedstudio.com/Star-Arm-102-p-6765.html)

## 🗺️ Hoja de ruta y estado

Estamos comprometidos a mantener y adaptarnos continuamente a los ecosistemas principales de desarrollo robótico. A continuación se muestra nuestro progreso actual de adaptación y el plan de lanzamiento:

### reBot Arm B601 DM
| Ecosistema compatible | Estado | Descripción / Fecha estimada de lanzamiento | Documentación relacionada |
| :--- | :---: | :--- | :--- |
| **Uso básico del motor** | ✅ Completado | Control básico de movimiento y encapsulación de API | [Damiao Technology](https://wiki.seeedstudio.com/cn/damiao_series/) |
| **Código abierto de las nuevas piezas estructurales 3D STEP y BOM** | ✅ Completado | Archivos STEP de todas las piezas, BOM y precios de referencia de componentes mecanizados | [reBot Arm B601-DM BOM](./hardware/reBot_B601_DM/readme_es.md) |
| **Referencia de pruebas de rendimiento en máquina real** | ✅ Completado | Referencia de rendimiento del brazo robótico en funcionamiento normal y extremo | [Performance Testing](./hardware/reBot_B601_DM/performance_testing/Performance_Testing_es.md) |
| **Video de ensamblaje** | ✅ Completado | Pasos de ensamblaje ultra detallados y video | [Primeros pasos con el reBot Arm B601-DM](https://wiki.seeedstudio.com/es/rebot_b601_dm_getting_started/) |
| **ROS2 (Humble)** | 🚧 En progreso | Drivers principales completados, optimización de MoveIt2 en curso | [Esperado: 2026.04.20] |
| **Python SDK** | ✅Optimización continua, PR bienvenidos | Integración integral en un solo lugar para la lectura, escritura y control de motores como Robstride, Damiao, Mota, Gaoqing, Hexfellow y otros. | [Tutorial para empezar a usar MotorBridge](https://motorbridge.seeedstudio.com) y [Interfaz Web](https://rebot-devarm.w0x7ce.eu/) |
| **Integración con Pinocchio** | ✅ Completado | Adaptación al framework Pinocchio para cinemática directa/inversa y compensación de gravedad | [Introducción a Pinocchio y MeshCat para reBot Arm B601-DM](https://wiki.seeedstudio.com/es/rebot_arm_b601_dm_pinocchio_meshcat/) y [Github Código de control](https://github.com/vectorBH6/reBotArm_control_py) |
| **Simulación en Isaac Sim** | 🚧 En progreso | Importación de modelos USD y teleoperación simulada | [Esperado: 2026.04.20] |
| **Integración con LeRobot** | ✅ Completado | Adaptación al framework LeRobot de Hugging Face | [Introducción a reBot Arm B601-DM basado en LeRobot y reBot 102 Leader](https://wiki.seeedstudio.com/es/rebot_arm_b601_dm_lerobot/) |
| **Integración con cámara de profundidad** | ✅ Completado | Demostración de agarre visual basada en YOLO y cámara de profundidad | [Getting Started with Visual Grasping Demo](https://wiki.seeedstudio.com/rebot_arm_b601_dm_grasping_demo/) |
| **Actualizaciones graduales de los últimos algoritmos** | ⏳ Planificado | Actualización progresiva de algoritmos principales | En curso |
| **Lanzamiento de una serie de cursos completamente gratuitos** | ⏳ Planificado | Actualización continua de contenidos educativos | En curso |
### reBot Arm B601 RS

| Ecosistema compatible                   |     Estado     | Descripción / Fecha estimada de lanzamiento | Documentación relacionada                                       |
| :-------------------------------------- | :------------: | :------------------------------------------ | :-------------------------------------------------------------- |
| **Uso básico del motor**                |  ✅ Completado  | Control básico y encapsulación de API       | [Robstride](https://wiki.seeedstudio.com/cn/robstride_control/) |
| **Código abierto de piezas STEP y BOM** | 🚧 En progreso | Archivos STEP, BOM y precios de referencia  | Expected [2026.05]                                           |
| **Video de ensamblaje**                 | 🚧 En progreso | Guía de ensamblaje detallada                | [Expected 2026.05]                                           |
| **ROS2 (Humble)**                       |  ⏳ Planificado | Drivers listos, optimización en curso       | [Expected 2026.05]                                              |
| **Integración con LeRobot**             |  ⏳ Planificado | Framework de aprendizaje robótico           | [Expected 2026.05]                                              |
| **Integración con Pinocchio**           |  ⏳ Planificado | Cinemática y compensación de gravedad       | [Expected 2026.05]                                              |
| **Simulación en Isaac Sim**             |  ⏳ Planificado | Simulación robótica                         | [Expected 2026.05]                                              |
| **Actualización de algoritmos**         |  ⏳ Planificado | Actualizaciones continuas                   | Ongoing                                                         |
| **Cursos gratuitos**                    |  ⏳ Planificado | Cursos abiertos                             | Ongoing                                                         |

---

## ⚙️ Especificaciones de hardware

reBot-DevArm está diseñado para aplicaciones de IA Corpórea en escritorio, equilibrando capacidad de carga y flexibilidad.

| Parameter                      | reBot Arm B601-DM                                                                            |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| **Carga continua recomendada** | Menos de 1.5 kg dentro del 70% del alcance                                                   |
| **Carga recomendada**          | **1.5 kg**                                                                                   |
| **Alcance máximo**             | **650 mm**                                                                                   |
| **Peso**                       | Aprox. 4.5 kg                                                                                |
| **Repetibilidad**              | < 0.2 mm                                                                                     |
| **Grados de libertad (DOF)**   | 6 DOF + 1 pinza (pinza servo CAN de código abierto y pinza con motor articular próximamente) |
| **Plataformas compatibles**    | ROS1, ROS2, LeRobot, Pinocchio, Isaac Sim, Python SDK                                        |
| **Voltaje de alimentación**    | DC 24V                                                                                       |

----

## 🧹 Hardware opcional
### Soporte de cámara de muñeca
| UVC 32×32 | Intel D435i | Intel D405 y Gemini 305 | Gemini 2 |
| --- | --- | --- | --- |
| Próximamente disponible | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D435i.jpg" height="100"> |  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D405.jpg" height="100"> | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Gemini2.jpg" height="100"> |
| Próximamente disponible | [Archivo STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) | [Archivo STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D405_305_Mount.step) |[Archivo STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) |

### Compatible con el brazo Leader
| Star Arm 102-LD | Abierto para integración y compatibilidad |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/star_arm_102.jpg" height="100">  | Próximamente disponible |
|  [Repositorio de Github](https://github.com/servodevelop/Star-Arm-102) | Próximamente disponible |

### Dedo blando DIY
| Dedo blando | Integración de compatibilidad abierta |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Soft_Finger.png" height="100">  |Próximamente|
| [Soporte de dedo (ABS/PLA)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Mount.step) y [Dedo (TPU 95+)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Finger.step)  |Próximamente |


-----


### 🎓 Ecosistema completo de robótica

reBot-DevArm no es solo un brazo robótico, sino también una comunidad de aprendizaje en robótica. Compartimos los siguientes tutoriales generales de forma gratuita:

#### 🖥️ Computación en el borde y control maestro

* [![Jetson](https://img.shields.io/badge/NVIDIA-reComputer%20Jetson-76B900?style=for-the-badge\&logo=nvidia\&logoColor=white)](https://wiki.seeedstudio.com/NVIDIA_Jetson/) —— **Inferencia de IA y núcleo de cómputo**
* [![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-4B%20%2F%205-C51A4A?style=for-the-badge\&logo=Raspberry%20Pi\&logoColor=white)](https://wiki.seeedstudio.com/raspberry-pi-devices/) —— **Entorno de desarrollo Linux general**
* [![ESP32](https://img.shields.io/badge/MCU-Seeed%20XIAO%20\(ESP32\)-0091BD?style=for-the-badge\&logo=espressif\&logoColor=white)](https://wiki.seeedstudio.com/SeeedStudio_XIAO_Series_Introduction/) —— **Nodo de control inalámbrico de bajo consumo**

#### 📡 Sensores y periféricos

* **🚗 Motores y servos**: [Damiao / Gogo / Robstride / Mita / Feite / Fashion Star](https://wiki.seeedstudio.com/robotics_page/)
* **👁️ Percepción visual**: [Cámaras de profundidad / LiDAR / Algoritmos de visión](https://wiki.seeedstudio.com/robotics_page/)
* **👂 Interacción auditiva**: [ReSpeaker Mic Arrays / Reconocimiento de voz](https://wiki.seeedstudio.com/ReSpeaker_Mic_Array_v2.0/)
* **🧭 Movimiento y orientación**: [IMU (6 ejes/9 ejes) / Giroscopios / Magnetómetros](https://wiki.seeedstudio.com/Sensor/IMU/)
* **🤖 Kits completos**: [Más sensores y ejemplos de controladores](https://wiki.seeedstudio.com/robotics_page/)

> 👉 **[Haz clic para entrar en la base de conocimiento Wiki](https://wiki.seeedstudio.com/)** (Todos los tutoriales son gratuitos)

---

## 🙌 Referencias y agradecimientos

El camino del código abierto nunca es solitario. El nacimiento del proyecto reBot-DevArm no sería posible sin el apoyo total de Seeed Studio, la comunidad global de código abierto y excelentes socios de hardware. Expresamos nuestro mayor respeto a los siguientes proyectos y equipos:

### 🌍 Ecosistema y soporte de software

* **[Seeed Studio](https://www.seeedstudio.com/)** - Proporciona soporte integral de cadena de suministro y técnico.
* **[Hugging Face LeRobot](https://github.com/huggingface/lerobot)** - Excelente framework de aprendizaje robótico de extremo a extremo.
* **[NVIDIA Isaac Sim](https://developer.nvidia.com/isaac/sim)** - Potente plataforma de simulación robótica y generación de datos.

### ⚙️ Socios principales de hardware

Gracias a los siguientes fabricantes por proporcionar soluciones de motores y actuadores de alto rendimiento:

* **[Damiao Technology](https://www.damiaokeji.com/)**
* **[Robstride](https://robstride.com/)**
* **[Fashion Star](https://fashionstar.com.hk/wiki/)**

### 💡 Inspiración

Este proyecto está profundamente inspirado en los siguientes proyectos de código abierto:

* **[SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100/tree/main)**
* **[Mobile ALOHA](https://github.com/tonyzhaozh/aloha)**
* **[Dummy-Robot (Zhihui Jun)](https://github.com/peng-zhihui/Dummy-Robot)**
* **[OpenArm](https://openarm.dev/)**
* **[I2RT](https://i2rt.com/)**
* **[TRLC-DK1](https://github.com/robot-learning-co/trlc-dk1)**

### 🎃 Contribuidores del prototipo

* **Equipo de robótica AI de SeeedStudio**: Yaohui Zhu ([yaohui.zhu@seeed.cc](mailto:yaohui.zhu@seeed.cc))
* **SeeedStudio STU**: Wentao Dong
* **SeeedStudio STU**: Weiwei Xu
* **Departamento de compras de SeeedStudio**: Fengqun Peng

### 👥 Contributors

## Our Top Contributors

<p align="center"><a href="https://github.com/Seeed-Projects/reBot-DevArm/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Seeed-Projects/reBot-DevArm" />
</a></p>

*Coming soon... Welcome to submit PRs to become a contributor!*

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Seeed-Projects/reBot-DevArm\&type=date\&legend=top-left)](https://www.star-history.com/#Seeed-Projects/reBot-DevArm&type=date&legend=top-left)

# Licencia del proyecto reBot-DevArm

- **Diseño de hardware** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), publicado bajo licencia [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)
- **Código del firmware** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), publicado bajo licencia [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Derechos y restricciones

Estimados desarrolladores y expertos de la industria, el proyecto del brazo robótico reBot Arm siempre se ha adherido a los valores fundamentales de **Agilidad, Apertura, Responsabilidad y Simbiosis** para servir a la comunidad de desarrolladores. Nuestra visión es permitir que cada entusiasta domine sistemáticamente la arquitectura del hardware y los principios del software de los brazos robóticos, y experimente de forma inmersiva los algoritmos de vanguardia de la inteligencia corporeizada a través del proyecto reBot.

Durante los primeros cinco meses desde su lanzamiento, el proyecto ha utilizado la licencia de código abierto **CC BY-SA NC (No Comercial)**. La intención original era permitir que todos los desarrolladores y contribuyentes se concentraran en iterar y mejorar el producto durante su fase inicial, menos madura, sin ser molestados por preocupaciones comerciales, y dedicarse plenamente a la co-construcción y optimización del proyecto.

Después de meses de profundo pulido del producto y maduración técnica por parte de Seeed Studio, **a partir del 11 de mayo de 2026**, el proyecto reBot Arm ha pasado oficialmente de la licencia CC BY-SA NC a la licencia de código abierto **CERN-OHL-W 2.0**.

A partir de este momento, el proyecto logra un **código abierto del 100% en toda la cadena (hardware y software)** , otorgando **derechos de uso comercial completos para todos los escenarios**.

Esperamos que continúen participando con un espíritu inclusivo y colaborativo, para sostener, mantener y profundizar la comunidad de código abierto reBot Arm, compartir los frutos del código abierto y construir juntos un ecosistema para la inteligencia corporeizada.

Este proyecto utiliza diferentes licencias de código abierto para Hardware y Software. Por favor, confirme los términos de la licencia aplicables a la parte que está utilizando.

| Elemento / Licencia                    | Hardware de reBot: CERN-OHL-W-2.0                              | SDK de software de reBot: Apache-2.0                         |
| -------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| **✅ Uso comercial permitido**         | ✅ Permitido                                                   | ✅ Permitido                                                 |
| **✅ Modificación permitida**          | ✅ Permitido                                                   | ✅ Permitido                                                 |
| **✅ Redistribución permitida**        | ✅ Permitido                                                   | ✅ Permitido                                                 |
| **✅ Integración/redistribución en código cerrado** | ❌ Condicional (ver [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) para más detalles) | ✅ Permitido (no es necesario divulgar el código modificado) |
| **⚠️ Obligación de conservar el aviso de copyright** | ✅ Obligatorio                                                 | ✅ Obligatorio                                               |
| **⚠️ Obligación de conservar el texto de la licencia** | ✅ Obligatorio                                                 | ✅ Obligatorio                                               |
| **⚠️ Notificación de modificaciones requerida** | ✅ Obligatorio (con fecha y descripción)                      | ✅ Obligatorio (con descripción de las modificaciones)       |
| **⚠️ Concesión de patentes**           | ✅ Concesión explícita de patentes (ver [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) para más detalles) | ✅ Concesión explícita de patentes                           |
| **⚠️ Obligación de proporcionar las fuentes al distribuir** | ✅ **Obligatorio** proporcionar las "Fuentes Completas" del hardware | ❌ Sin obligación de proporcionar las fuentes                |
| **⚠️ Compatibilidad con módulos externos/cerrados** | ✅ Permitido (característica Weakly Reciprocal)               | ✅ Totalmente permitido                                      |
| **🔗 Relación con otros componentes/módulos** | Los módulos de interfaz independientes (External Material) pueden conservar su licencia original (cerrada) | Sin restricciones, puede enlazarse con bibliotecas bajo cualquier licencia |
| **📄 Texto oficial de la licencia**    | [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)          | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)    |

## ☎ Contact Us

* **Progreso de código abierto y soporte técnico**-Yaohui: [yaohui.zhu@seeed.cc](mailto:yaohui.zhu@seeed.cc)
* **Colaboración futura y personalización**-Elaine: [elaine.wu@seeed.cc](mailto:elaine.wu@seeed.cc)
