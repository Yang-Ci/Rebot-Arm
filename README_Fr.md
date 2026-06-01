# 🦾 reBot-DevArm : bras robotique open source pour tous les développeurs

<p align="center">
  <img src="./media/v1.0.png" alt="Bannière reBot-DevArm">
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
  <strong>100 % entièrement open source · IA incarnée · Intégration matériel-logiciel · Gratuit pour un usage personnel/éducatif · L’utilisation commerciale nécessite une autorisation</strong>
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
    <img src="https://img.shields.io/badge/Documentation-📕-blue" alt="wiki robotique"></a>
</p>

## 📖 Introduction

**reBot-DevArm (reBot Arm B601 DM et reBot Arm B601 RS)** est un projet de bras robotique dédié à réduire les barrières d’apprentissage de l’IA incarnée. Nous mettons l’accent sur le **« véritable open source »** — pas seulement le code, nous ouvrons absolument tout sans réserve :
- 🦾 **Deux versions du bras robotique**：Nous fournirons tous les fichiers open source pour deux versions du bras robotique ayant la même apparence : **Robostride** et **Damiao**.
- 🛠️ **Plans matériels** : fichiers sources pour les pièces en tôle et les pièces imprimées en 3D.
- 🔩 **Liste BOM** : détails complets jusqu’aux spécifications et aux liens d’achat de chaque vis.
- 💻 **Logiciels & algorithmes** : SDK Python, ROS1/2, Isaac Sim, LeRobot, etc.

# Obtenez votre propre bras robotique reBot Arm

- Nous proposons cinq options de kits sur [Seeedstudio.com](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html) :
  - **Kit Corps du Bras + Moteurs** : Comprend uniquement les moteurs et les faisceaux de câblage du bras robotique.
  - **Kit Structure du Corps du Bras** : Comprend uniquement les composants structurels mécaniques.
  - **Kit Complet de Préhenseur** : Comprend les moteurs, les faisceaux de câblage et les composants structurels du préhenseur.
  - **Kit Complet** : Comprend l'ensemble complet du corps du bras robotique et du préhenseur.
  - **Bras Robotique Pré-assemblé** : Bras robotique fini entièrement assemblé.

- Vous pouvez également acheter le [Leader Arm](https://www.seeedstudio.com/Star-Arm-102-p-6765.html)

## 🗺️ Feuille de route & état

Nous nous engageons à maintenir et à adapter en continu les principaux écosystèmes de développement robotique. Voici notre état actuel d’adaptation et le calendrier de publication prévu :

### reBot Arm B601 DM
| Écosystème pris en charge | État | Description / date de publication estimée | Documentation associée |
| :--- | :---: | :--- | :--- |
| **Utilisation de base des moteurs** | ✅ Terminé | Contrôle de mouvement de base et encapsulation d’API | [Damiao Technology](https://wiki.seeedstudio.com/cn/damiao_series/) |
| **Open source des nouvelles pièces structurelles STEP 3D et de la BOM** | ✅ Terminé | Fichiers STEP de toutes les pièces de la nouvelle version, BOM des pièces et prix de référence de toutes les pièces usinées | [reBot Arm B601-DM BOM](./hardware/reBot_B601_DM/readme_fr.md) |
| **Référence pour les tests de performance sur machine réelle** | ✅ Terminé  | Référence de performance du bras robotisé en fonctionnement normal et extrême |[Performance Testing](./hardware/reBot_B601_DM/performance_testing/Performance_Testing_Fr.md) |
| **Vidéo d’assemblage** | ✅ Terminé | Étapes d’assemblage ultra détaillées et vidéo | [Getting Started with reBot Arm B601-DM](https://wiki.seeedstudio.com/rebot_b601_dm_getting_started/) |
| **ROS2 (Humble)** | 🚧 En cours  | Les pilotes principaux sont terminés, et MoveIt2 est actuellement en cours d’optimisation | [Prévu : 2026.04.20] |
| **SDK Python** | ✅ Optimisation continue, PR bienvenues | Intégration tout-en-un de la lecture, de l’écriture et du contrôle des moteurs Robstride, Damiao, Mota, Gaoqing, Hexfellow et autres moteurs. | [Tutoriel pour prendre en main MotorBridge](https://motorbridge.seeedstudio.com) et [Interface Web](https://rebot-devarm.w0x7ce.eu/) |
| **Intégration Pinocchio** | ✅ Terminé   | Adaptation au framework Pinocchio, permettant la cinématique directe/inverse et la compensation gravitationnelle pour le bras robotique |[Getting Started with Pinocchio for reBot Arm B601-DM](https://wiki.seeedstudio.com/rebot_arm_b601_dm_pinocchio_meshcat/) ainsi que [Github code de contrôle](https://github.com/vectorBH6/reBotArm_control_py) |
| **Simulation Isaac Sim** | 🚧 En cours  | Importation de modèles USD et activation de la téléopération simulée | [Prévu : 2026.04.20] |
| **Intégration LeRobot** | ✅ Terminé  | Adaptation au framework d’entraînement Hugging Face LeRobot |  [Getting Started with LeRobot-based reBot Arm](https://wiki.seeedstudio.com/rebot_arm_b601_dm_lerobot/) |
| **Intégration caméra de profondeur** | ✅ Terminé | Démonstration de préhension visuelle basée sur YOLO et une caméra de profondeur | [Getting Started with Visual Grasping Demo](https://wiki.seeedstudio.com/rebot_arm_b601_dm_grasping_demo/) |
| **Mises à jour progressives des derniers algorithmes** | ⏳ Planifié | Les algorithmes grand public seront mis à jour progressivement | En continu |
| **Lancement d’une série de cours entièrement gratuits** | ⏳ Planifié | Les algorithmes grand public seront mis à jour progressivement | En continu |



### reBot Arm B601 RS

| Écosystème pris en charge | État | Description / date de publication estimée | Documentation associée |
| :--- | :---: | :--- | :--- |
| **Utilisation de base des moteurs** | ✅ Terminé | Contrôle de mouvement de base et encapsulation d’API | [Robstride](https://wiki.seeedstudio.com/cn/robstride_control/) |
| **Open source des nouvelles pièces structurelles STEP 3D et de la BOM** | 🚧 En cours | Fichiers STEP de toutes les pièces de la nouvelle version, BOM des pièces et prix de référence de toutes les pièces usinées | Prévu [2026.05] |
| **Vidéo d’assemblage** | 🚧 En cours | Étapes d’assemblage ultra détaillées et vidéo | [Prévu 2026.05] |
| **ROS2 (Humble)** | ⏳ Planifié | Les pilotes principaux sont terminés, et MoveIt2 est actuellement en cours d’optimisation | [Prévu 2026.05] |
| **Intégration LeRobot** | ⏳ Planifié | Adaptation au framework d’entraînement Hugging Face LeRobot | [Prévu 2026.05] |
| **Intégration Pinocchio** | ⏳ Planifié | Adaptation au framework Pinocchio, permettant la cinématique directe/inverse et la compensation gravitationnelle pour le bras robotique | [Prévu 2026.05] |
| **Simulation Isaac Sim** | ⏳ Planifié | Importation de modèles USD et activation de la téléopération simulée | [Prévu 2026.05] |
| **Mises à jour progressives des derniers algorithmes** | ⏳ Planifié | Les algorithmes grand public seront mis à jour progressivement | En continu |
| **Lancement d’une série de cours entièrement gratuits** | ⏳ Planifié | Les algorithmes grand public seront mis à jour progressivement | En continu |


---

## ⚙️ Spécifications matérielles

reBot-DevArm est conçu pour des applications d’IA incarnée sur bureau, en équilibrant la capacité de charge utile et la flexibilité.

| Paramètre | reBot Arm B601-DM |
| :--- | :--- |
| **Charge continue recommandée** | Moins de 1,5 kg dans 70 % de l’espace de travail de portée du bras |
| **Charge utile recommandée** | **1,5 kg** |
| **Portée maximale** | **650 mm** |
| **Poids** | Environ 4,5 kg |
| **Répétabilité** | < 0,2 mm |
| **Degrés de liberté (DOF)** | 6 DOF + 1 pince (pince servo CAN open source et pince à moteur d’articulation bientôt disponibles) |
| **Plateformes/écosystèmes pris en charge** | ROS1, ROS2, LeRobot, Pinocchio, Isaac Sim, SDK Python |
| **Tension d’alimentation** | DC 24V |

----

## 🧹 Accessoires optionnels
### Support de caméra au poignet
| UVC 32×32 | Intel D435i | Intel D405 et Gemini 305 | Gemini 2 |
| --- | --- | --- | --- |
| Bientôt disponible | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D435i.jpg" height="100"> |  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D405.jpg" height="100"> | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Gemini2.jpg" height="100"> |
| Bientôt disponible | [Fichier STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) | [Fichier STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D405_305_Mount.step) |[Fichier STEP](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) |

### Compatible avec le bras Leader
| Star Arm 102-LD | Ouvert à l'intégration et la compatibilité |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/star_arm_102.jpg" height="100">  | Bientôt disponible |
|  [Dépôt Github](https://github.com/servodevelop/Star-Arm-102) | Bientôt disponible |


### Doigt souple DIY
| Doigt souple | Intégration compatible ouverte |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Soft_Finger.png" height="100">  |Bientôt disponible|
| [Support de doigt (ABS/PLA)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Mount.step) et [Doigt (TPU 95+)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Finger.step)  |Bientôt disponible |

---

### 🎓 Écosystème robotique full-stack
reBot-DevArm n’est pas seulement un bras robotique, mais une communauté d’apprentissage de la robotique. Nous partageons gratuitement les tutoriels généraux suivants :

#### 🖥️ Edge Computing & contrôle principal
*   [![Jetson](https://img.shields.io/badge/NVIDIA-reComputer%20Jetson-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://wiki.seeedstudio.com/NVIDIA_Jetson/) —— **Inférence IA & cœur de calcul**
*   [![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-4B%20%2F%205-C51A4A?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white)](https://wiki.seeedstudio.com/raspberry-pi-devices/) —— **Environnement général de développement Linux**
*   [![ESP32](https://img.shields.io/badge/MCU-Seeed%20XIAO%20(ESP32)-0091BD?style=for-the-badge&logo=espressif&logoColor=white)](https://wiki.seeedstudio.com/SeeedStudio_XIAO_Series_Introduction/) —— **Nœud de contrôle sans fil basse consommation**

#### 📡 Capteurs & périphériques
*   **🚗 Moteurs & servomoteurs** : [Damiao / Gogo / Robstride / Mita / Feite / Fashion Star](https://wiki.seeedstudio.com/robotics_page/)
*   **👁️ Perception visuelle** : [Caméras de profondeur / LiDAR / algorithmes de vision](https://wiki.seeedstudio.com/robotics_page/)
*   **👂 Interaction auditive** : [Réseaux de micros ReSpeaker / reconnaissance vocale](https://wiki.seeedstudio.com/ReSpeaker_Mic_Array_v2.0/)
*   **🧭 Mouvement & attitude** : [IMU (6 axes/9 axes) / gyroscopes / magnétomètres](https://wiki.seeedstudio.com/Sensor/IMU/)
*   **🤖 Kits complets** : [Plus de capteurs robotiques & d’exemples de pilotes](https://wiki.seeedstudio.com/robotics_page/)


> 👉 **[Cliquez pour accéder à la base de connaissances du Wiki](https://wiki.seeedstudio.com/)** (Tous les tutoriels sont consultables gratuitement)

---


## 🙌 Références & remerciements
Le chemin de l’open source n’est jamais solitaire. La naissance du projet reBot-DevArm n’aurait pas été possible sans le soutien total de Seeed Studio, de la communauté open source mondiale et d’excellents partenaires matériels. Nous exprimons notre plus profond respect aux projets et équipes suivants :

### 🌍 Écosystème & support logiciel
*   **[Seeed Studio](https://www.seeedstudio.com/)** - Fournit un support complet en chaîne d’approvisionnement matériel et en assistance technique.
*   **[Hugging Face LeRobot](https://github.com/huggingface/lerobot)** - Un excellent framework d’apprentissage robotique de bout en bout.
*   **[NVIDIA Isaac Sim](https://developer.nvidia.com/isaac/sim)** - Une puissante plateforme de simulation robotique et de données synthétiques.

### ⚙️ Partenaires matériels principaux
Merci aux fabricants suivants pour avoir fourni des solutions de moteurs et d’actionneurs hautes performances :
*   **[Damiao Technology](https://www.damiaokeji.com/)**
*   **[Robstride](https://robstride.com/)**
*   **[Fashion Star](https://fashionstar.com.hk/wiki/)**

### 💡 Inspiration
Ce projet est profondément inspiré par les excellents projets open source suivants :
*   **[SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100/tree/main)**
*   **[Mobile ALOHA](https://github.com/tonyzhaozh/aloha)**
*   **[Dummy-Robot (Zhihui Jun)](https://github.com/peng-zhihui/Dummy-Robot)**
*   **[OpenArm](https://openarm.dev/)**
*   **[I2RT](https://i2rt.com/)**
*   **[TRLC-DK1](https://github.com/robot-learning-co/trlc-dk1)**

### 🎃 Contributeurs du prototype
- **Équipe SeeedStudio AI Robotics** : Yaohui Zhu (yaohui.zhu@seeed.cc)
- **SeeedStudio STU** : Wentao Dong
- **SeeedStudio STU** : Weiwei Xu
- **Département des achats de SeeedStudio** : Fengqun Peng


### 👥 Contributeurs

## Nos principaux contributeurs 
<p align="center"><a href="https://github.com/Seeed-Projects/reBot-DevArm/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Seeed-Projects/reBot-DevArm" />
</a></p>



*Bientôt disponible... N’hésitez pas à soumettre des PR pour devenir contributeur !*

## Historique des étoiles

[![Star History Chart](https://api.star-history.com/svg?repos=Seeed-Projects/reBot-DevArm&type=date&legend=top-left)](https://www.star-history.com/#Seeed-Projects/reBot-DevArm&type=date&legend=top-left)

# Licence du projet reBot-DevArm

- **Conception matérielle** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), publié sous licence [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)
- **Code du firmware** © 2026 Seeed Studio Co., Ltd. (SeeedStudio), publié sous licence [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Droits et restrictions

Chers développeurs et experts du secteur, le projet de bras robotique reBot Arm a toujours adhéré aux valeurs fondamentales d'**Agilité, d'Ouverture, de Responsabilité et de Symbiose** au service de la communauté des développeurs. Notre vision est de permettre à chaque passionné de maîtriser systématiquement l'architecture matérielle et les principes logiciels des bras robotiques, et de vivre une expérience immersive avec les algorithmes de pointe de l'intelligence incarnée, grâce au projet reBot.

Pendant les cinq premiers mois suivant son lancement, le projet a utilisé la licence open source **CC BY-SA NC (Non-Commercial)**. L'intention initiale était de permettre à tous les développeurs et contributeurs de se concentrer sur l'itération et l'amélioration du produit pendant sa phase initiale, moins mature, sans être perturbés par des préoccupations commerciales, et de se consacrer pleinement à la co-construction et à l'optimisation du projet.

Après des mois de perfectionnement approfondi du produit et de maturation technique par Seeed Studio, **à compter du 11 mai 2026**, le projet reBot Arm est officiellement passé de la licence CC BY-SA NC à la licence open source **CERN-OHL-W 2.0**.

À partir de ce moment, le projet atteint une **open source à 100 % sur l'ensemble de la chaîne (matériel et logiciel)** , accordant **des droits d'utilisation commerciale complets pour tous les scénarios**.

Nous espérons que vous continuerez à participer, dans un esprit d'inclusion et de collaboration, à soutenir, maintenir et approfondir la communauté open source reBot Arm, à partager les fruits de l'open source et à construire ensemble un écosystème pour l'intelligence incarnée.

Ce projet utilise différentes licences open source pour le matériel et le logiciel. Veuillez confirmer les termes de la licence applicables à la partie que vous utilisez.

| Élément / Licence                          | Matériel reBot : CERN-OHL-W-2.0                              | SDK logiciel reBot : Apache-2.0                              |
| ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **✅ Utilisation commerciale autorisée**   | ✅ Autorisée                                                 | ✅ Autorisée                                                 |
| **✅ Modification autorisée**              | ✅ Autorisée                                                 | ✅ Autorisée                                                 |
| **✅ Redistribution autorisée**            | ✅ Autorisée                                                 | ✅ Autorisée                                                 |
| **✅ Intégration/redistribution en source fermée** | ❌ Conditionnelle (voir [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) pour plus de détails) | ✅ Autorisée (aucune obligation de divulguer le code modifié) |
| **⚠️ Conservation de la mention de copyright requise** | ✅ Requise                                                   | ✅ Requise                                                   |
| **⚠️ Conservation du texte de la licence requise** | ✅ Requise                                                   | ✅ Requise                                                   |
| **⚠️ Mention des modifications requise**  | ✅ Requise (avec date et description)                        | ✅ Requise (avec description des modifications)              |
| **⚠️ Licence de brevet**                   | ✅ Licence de brevet explicite (voir [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) pour plus de détails) | ✅ Licence de brevet explicite                               |
| **⚠️ Fourniture des sources lors de la distribution** | ✅ **Obligation** de fournir les "Sources Complètes" du matériel | ❌ Aucune obligation de fournir les sources                  |
| **⚠️ Compatibilité avec les modules externes/fermés** | ✅ Autorisée (caractéristique Weakly Reciprocal)            | ✅ Totalement autorisée                                      |
| **🔗 Relation avec d'autres composants/modules** | Les modules d'interface indépendants (External Material) peuvent conserver leur licence d'origine (fermée) | Aucune restriction, peut se lier à des bibliothèques sous n'importe quelle licence |
| **📄 Texte officiel de la licence**        | [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)        | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)    |


## ☎ Contactez-nous
- **Progrès open source & support technique**-Yaohui : yaohui.zhu@seeed.cc
- **Collaboration future & personnalisation**-Elaine : elaine.wu@seeed.cc
