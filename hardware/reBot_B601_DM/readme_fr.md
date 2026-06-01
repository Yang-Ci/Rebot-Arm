# 🤖 Spécifications Matérielles Open Source du reBot DevArm

<p align="center">
  <img src="../../media/v1.1.png" alt="reBot-DevArm Banner">
</p>
<p align="center">
  <strong>
    <a href="./readme_zh.md">简体中文</a> &nbsp;|&nbsp;
    <a href="./readme.md">English</a> &nbsp;|&nbsp;
    <a href="./readme_jp.md">日本語</a>&nbsp;|&nbsp;
    <a href="./readme_fr.md">français</a>&nbsp;|&nbsp;
    <a href="./readme_es.md">Español</a>
  </strong>
</p>

| Date | Version | Nom du fichier | Historique des modifications |
|----------|------|----------|------|
| 2026-03-31 | v1.0 | reBot_B601_DM_v1.0_20260331.step | Mise en ligne initiale |
| 2026-04-15 | v1.1 | reBot_B601_DM_v1.1_20260415.step | Ajout de colliers de câble pour les 3 moteurs d’articulation terminale afin d’éviter le desserrage et la déconnexion. Correction du modèle de l’articulation 1 de 4310 à 4340P. Ajout de la pièce usinée CNC 02_Base_Reinforcement_Part.step à la base pour renforcer la rigidité. |

Cette nomenclature (BOM) concerne le bras robotique reBot Arm B601 DM, équipé de moteurs Damiao série 43.
L’autre version, reBot Arm B601 RS, utilise des moteurs RobStride ; [voir la nomenclature ici](../reBot_B601_RS/README.md).

# 📦 Structure des fichiers
*   3D_Printed_Parts/ : Fichiers Step de toutes les pièces imprimées en 3D.
*   Metal_Parts/ : Fichiers Step de toutes les pièces métalliques usinées CNC.
*   Purchased_Parts/ : Fichiers Step de tous les composants standard achetés.
*   reBot_B601_DM_v1.1_20260415.step : Fichier d’assemblage complet du bras robotique.

# 🛒 [Obtenir toutes les pièces](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html)
- Nous proposons cinq options de kit :
  - **Kit Moteurs du Bras** : Inclut uniquement les moteurs et faisceaux de câbles du bras robotique.
  - **Kit Structure du Bras** : Inclut uniquement les composants mécaniques de structure.
  - **Kit Complet Préhenseur** : Inclut moteurs, faisceaux de câbles et composants de structure du préhenseur.
  - **Kit Complet** : Inclut l’ensemble du corps du bras robotique et du préhenseur.
  - **Bras Robotique Pré-assemblé** : Bras robotique fini entièrement assemblé.

# 📊 Nomenclature (BOM)

> [!WARNING]
> Déclaration : La nomenclature publiée **ne représente pas** la version finale livrée par Seeed.
> Cette version open source v1.1 est optimisée pour que les développeurs puissent la reproduire à coût minimal, avec certains détails non essentiels simplifiés.
> La version de production finale Seeed comprendra une gravure laser métallique pour éviter les erreurs de montage, certaines pièces imprimées en 3D seront remplacées par du métal pour plus de durabilité, les jeux et tolérances d’usinage seront ajustés pour les variations industrielles (équilibre entre précision et coût), et un câblage personnalisé (avec gaine tressée par exemple) sera ajouté avec un coût supplémentaire. Cependant, la structure mécanique reste identique.

---

## 🖨️ Pièces imprimées en 3D

| Description de la pièce | Image | Nom du fichier | Matériau | Qté | Notes |
|----------|------|--------|------|----------|------|
| Plaque de base du bras robotique | <img src="./3D_Printed_Parts/images/02-BASE.png" width="80"> | 01_BASE_Plate.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Liaison de base du bras robotique | <img src="./3D_Printed_Parts/images/02-BASE_02.png" width="80"> | 01_BASE_Link.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Garniture côté gauche du bras supérieur | <img src="./3D_Printed_Parts/images/02-DOWN_TRIM_1.png" width="80"> | 01_Upper_Arm_Fuller_L.step | Bambu PLA Noir & Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Garniture côté droit du bras supérieur | <img src="./3D_Printed_Parts/images/02-DOWN_TRIM_2.png" width="80"> | 01_Upper_Arm_Fuller_R.step | Bambu PLA Noir & Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Garniture centrale du bras supérieur | <img src="./3D_Printed_Parts/images/02-DOWN-FILLING.png" width="80"> | 01_Upper_Arm_Fuller_M.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Butée de limite horizontale du bras supérieur | <img src="./3D_Printed_Parts/images/02-SPACER-DOWN.png" width="80"> | 01_Upper_Arm_Limit.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Poignée du bras | <img src="./3D_Printed_Parts/images/02-HANDLE.png" width="80"> | 01_Arm_Handle.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Garniture côté gauche du bras inférieur | <img src="./3D_Printed_Parts/images/02-UP-TRIM_1.png" width="80"> | 01_Lower_Arm_Filler_L.step | Bambu PLA Noir & Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Garniture côté droit du bras inférieur | <img src="./3D_Printed_Parts/images/02-UP-TRIM_2.png" width="80"> | 01_Lower_Arm_Filler_R.step | Bambu PLA Noir & Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Garniture centrale du bras inférieur | <img src="./3D_Printed_Parts/images/02-UP-FILLING.png" width="80"> | 01_Lower_Arm_Filler_M.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Cache du bras supérieur | <img src="./3D_Printed_Parts/images/02-DOWN-COVER.png" width="80"> | 01_Upper_Arm_Cover.step | Bambu PLA Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Cache du bras inférieur | <img src="./3D_Printed_Parts/images/02-UP-COVER.png" width="80"> | 01_Lower_Arm_Cover.step | Bambu PLA Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Cache de protection du moteur 5 | <img src="./3D_Printed_Parts/images/02-MOTOR-COVER.png" width="80"> | 01_Motor_Cover.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Butée de limite horizontale du préhenseur | <img src="./3D_Printed_Parts/images/02-SPACER.png" width="80"> | 01_Lower_Arm_Limit.step | Bambu PLA Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Support de coulisseau du préhenseur | <img src="./3D_Printed_Parts/images/02-3D-RAIL-BRACKET.png" width="80"> | 01-Rail-Bracket.step | Bambu PLA Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Doigt de préhenseur | <img src="./3D_Printed_Parts/images/02-CLIP_1.png" width="80"> | 01_Finger.step | Bambu ABS Noir | 2 | Buse 0.4, hauteur de couche 0.2, remplissage 45% |
| Collier de câble du moteur 5 | <img src="./3D_Printed_Parts/images/01_Joint5_Cable Restraint_A.png" width="80"> | 01_Joint5_Cable Restraint_A.step | Bambu PLA Vert | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 15% |
| Collier de câble A pour moteurs 6 & 7 | <img src="./3D_Printed_Parts/images/01_Joint6_7_Cable Restraint_A.png" width="80"> | 01_Joint6_7_Cable Restraint_A.step | Bambu ABS Noir | 2 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| Collier de câble B pour moteurs 6 & 7 | <img src="./3D_Printed_Parts/images/01_Joint6_7_Cable Restraint_B.png" width="80"> | 01_Joint6_7_Cable Restraint_B.step | Bambu ABS Noir | 2 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |
| - | Prix de référence | Moyenne **50$** | | | Prix variable selon coût du matériau et temps d’impression |

## 📷 Support de caméra compatible

| Description de la pièce | Image | Nom du fichier | Matériau | Qté | Notes |
|----------|------|--------|------|----------|------|
| [Orbbec Gemini2](https://www.seeedstudio.com/Orbbec-Gemini-2-3D-Camera-p-6464.html) | <img src="./3D_Printed_Parts/images/Gemini2_mount.png" width="80"> | Gemini2_mount.step | Bambu ABS Noir | 1 | Buse 0.4, hauteur de couche 0.2, remplissage 30% |

### 🧩 Recommandations d’impression
- Hauteur de couche : 0.2 mm
- Buse : 0.4 mm
- Supports : Ajouter si nécessaire
- Matériaux : Pièces résistant à la chaleur et aux charges : ABS avec remplissage 30–80% ; nylon ou matériaux renforcés de fibre de carbone également possibles. Pièces esthétiques : PLA avec remplissage 15%.
- Matériaux recommandés pour les pièces sous charge :

---

## 🔩 Pièces métalliques usinées CNC

> [!WARNING]
> Certaines pièces pouvant être remplacées par impression 3D sont indiquées en note, ce qui permet de réduire significativement les coûts.

| Description de la pièce | Image | Nom du fichier | Matériau | Qté | Usinage | Notes |
|----------|------|--------|----------|------|------|------|
| Support de palier du moteur 1 | <img src="./Metal_Parts/images/02_Base_Reinforcement_Part.png" width="80"> | 02_Base_Reinforcement_Part.step | Alliage d’aluminium 5052 | 1 | CNC | Peut être imprimé en 3D en ABS avec fort remplissage pour réduire les coûts |
| Axe de rotation du moteur 1 avec butée | <img src="./Metal_Parts/images/02_Arm_Yaw_Limit.png" width="80"> | 02_Arm_Yaw_Limit.step | Alliage d’aluminium 5052 | 1 | CNC | Ajout de limite de mouvement en lacet |
| Entretoise avant moteurs 2–5 | <img src="./Metal_Parts/images/02_Motor_Front_Spacer.png" width="80"> | 02_Motor_Front_Spacer.step | Alliage d’aluminium 5052 | 4 | CNC | Peut être imprimé en 3D en ABS avec remplissage 30% |
| Entretoise arrière moteurs 2–4 | <img src="./Metal_Parts/images/02_Motor_Back_Spacer.png" width="80"> | 02_Motor_Back_Spacer.step | Alliage d’aluminium 5052 | 3 | CNC | |
| Bride arrière moteurs 2–4 | <img src="./Metal_Parts/images/02_FLANGE.png" width="80"> | 02_FLANGE.step | Alliage d’aluminium 5052 | 3 | CNC | |
| Support du moteur poignet 5 | <img src="./Metal_Parts/images/02_Wrist_Bracket.png" width="80"> | 02_Wrist_Bracket.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Raccord préhenseur A | <img src="./Metal_Parts/images/02_Gripper_Connector_A.png" width="80"> | 02_Gripper_Connector_A.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Raccord préhenseur B | <img src="./Metal_Parts/images/02_Gripper_Connector_B.png" width="80"> | 02_Gripper_Connector_B.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Support métallique de coulisseau préhenseur | <img src="./Metal_Parts/images/02_Slider_Bracket.png" width="80"> | 02_Slider_Bracket.step | Alliage d’aluminium 5052 | 1 | CNC | Peut être imprimé en 3D en ABS avec fort remplissage, non recommandé pour une utilisation prolongée |
| Extension coulisseau-préhenseur | <img src="./Metal_Parts/images/02_Slider_Extension.png" width="80"> | 02_Slider_Extension.step | Alliage d’aluminium 5052 | 2 | CNC | |
| Liaison gauche bras supérieur-bras inférieur | <img src="./Metal_Parts/images/02_Lower_Upper_Link_L.png" width="80"> | 02_Lower_Upper_Link_L.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Liaison droite bras supérieur-bras inférieur | <img src="./Metal_Parts/images/02_Lower_Upper_Link_R.png" width="80"> | 02_Lower_Upper_Link_R.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Liaison gauche bras inférieur-poignet | <img src="./Metal_Parts/images/02_Lower_Wrist_Link_L.png" width="80"> | 02_Lower_Wrist_Link_L.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Liaison droite bras inférieur-poignet | <img src="./Metal_Parts/images/02_Lower_Wrist_Link_R.png" width="80"> | 02_Lower_Wrist_Link_R.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Raccord de pignon | <img src="./Metal_Parts/images/02_Gear_Connector.png" width="80"> | 02_Gear_Connector.step | Alliage d’aluminium 5052 | 1 | CNC | |
| Rack | <img src="./Metal_Parts/images/Rack.png" width="80"> | 02_Rack.step | Alliage d’aluminium 5052 | 2 | CNC | |
| Liaison 1 | <img src="./Metal_Parts/images/Link1.png" width="80"> | 03_Link1.step | Alliage d’aluminium 5052 | 1 | CNC + tôlerie | |
| Liaison 2 | <img src="./Metal_Parts/images/Link2.png" width="80"> | 03_Link2.step | Alliage d’aluminium 5052 | 2 | CNC + tôlerie | |
| Liaison 3 gauche | <img src="./Metal_Parts/images/Link3_L.png" width="80"> | 03_Link3_L.step | Alliage d’aluminium 5052 | 1 | CNC + tôlerie | |
| Liaison 3 droite | <img src="./Metal_Parts/images/Link3_R.png" width="80"> | 03_Link3_R.step | Alliage d’aluminium 5052 | 1 | CNC + tôlerie | |
| Liaison 5 | <img src="./Metal_Parts/images/Link5.png" width="80"> | 03_Link5.step | Alliage d’aluminium 5052 | 1 | CNC + tôlerie | |
| - | Prix de référence marché | Moyenne **250$** | | | Prix variable selon coût de l’aluminium, exigences de tolérance, délais |

### 🧩 Spécifications d’usinage
- Tolérance dimensionnelle clé : ±0.02 mm GB/T1840-M
- Finition de surface : Anodisation / sablage
- Pièces d’assemblage recommandées : ajustement H7 / ajustement serré

---

## 🛒 Pièces achetées (pièces standard)

> [!WARNING]
> Comme chacun devra assembler et serrer les vis soi-même, des vis hexagonales intérieures standard ont été sélectionnées. Après un fonctionnement prolongé, les vis peuvent se desserrer, ce qui affecte la précision du bras robotique. Pour cette raison, vous devez acheter en plus de la colle chaude pour effectuer un freinage fileté sur les vis de chaque articulation.

Si vous disposez d’une perceuse électrique ou d’outils similaires, vous pouvez choisir d’acheter des rondelles freins ou des vis freins filetées à la place. Cependant, **il est extrêmement important** d’utiliser le réglage de couple le plus bas avec un tournevis électrique pour éviter d’arracher les filets, ce qui entraînerait des dommages irréversibles.

| Nom | Spécification / Modèle | Quantité | Prix de référence | Notes |
|------|----------|------|----------|------|
| Moteur sans balais | DM4310(V4) | 4 | 120 $/unité | [SeeedStudio](https://www.seeedstudio.com/DIP-Servo-Motor-24V-120RPM-Brushless-98-9mm-4P-L56-W56-H46mm-p-6660.html) |
| Moteur sans balais | DM4340P(V4) | 3 | 175 $/unité | [SeeedStudio](https://www.seeedstudio.com/DM4340P-Actuator-p-6663.html) |
| Carte d’interface CAN-USB | - | 1 | 15 $/unité | [SeeedStudio](https://www.seeedstudio.com/DM-CAN-USB-Driver-Borad-p-6706.html) |
| Palier | 6707ZZ | 1 | 13 $/unité | Amazon |
| Palier | 6803ZZ | 3 | 13 $/unité | Amazon |
| Palier | AXK5578 | 1 | 12 $/unité | Amazon |
| Rail linéaire | MGN9-170mm | 1 | 23 $/unité | Amazon |
| Bloc coulissant | MGN9 | 2 | 10 $/unité | Amazon |
| Pignon | Module 1, type moyeu, 16 dents, alésage 6 mm | 1 | 44 $/unité | Amazon |
| Patin en silicone | 30x9x2mm | 1 | 10 $ | Amazon |
| Vis | HM3-12mm | 14+ | - | Amazon |
| Vis | HM3-25mm | 14+ | - | Amazon |
| Vis | HM3-6mm | 16+ | - | Amazon |
| Vis | HM4-75mm sans tête | 4+ | - | Amazon |
| Vis | KM3×12mm fraisée | 30+ | - | Amazon |
| Vis | KM3×16mm fraisée | 34+ | - | Amazon |
| Vis | KM3×7mm fraisée | 76+ | - | Amazon |
| Vis | KM3×9mm fraisée | 31+ | - | Amazon |
| Vis | KM3×8mm fraisée à tête très basse | 31+ | - | Amazon |
| Vis | KA3×12mm tête bombée | 72+ | - | Amazon |
| Goupille cylindrique | M4×8mm | Plusieurs | - | Amazon |
| Goupille cylindrique | M4×12mm | Plusieurs | - | Amazon |
| Jeu de tournevis | Jeu de clés hexagonales | 1 | 16 $ | Amazon |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 350mm | 2 | 4 $/câble | Deux extrémités coudées |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 350mm | 1 | 4 $/câble | Une extrémité coudée, une droite |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 200mm | 3 | 4 $/câble | Deux extrémités coudées |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 200mm | 1 | 3 $/câble | Deux extrémités droites |
| Serre-joint | Serre-joint G 6 pouces | 2 | 20 $/unité | Amazon |
| Alimentation électrique | 24V 14.6A | 1 | 30 $ | Amazon |
| Câble d’alimentation | 12AWG | 1 | 30 $ | Amazon |
| Câble d’alimentation | XT30 16AWG | 1 | 9 $ | Amazon |