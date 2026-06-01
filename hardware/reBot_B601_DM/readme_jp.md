# 🤖 reBot DevArm オープンソースハードウェア仕様書

<p align="center">
  <img src="../../media/v1.1.png" alt="reBot-DevArm バナー">
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

| 日付 | バージョン | ファイル名 | 変更履歴 |
|----------|------|----------|------|
| 2026-03-31 | v1.0 | reBot_B601_DM_v1.0_20260331.step | 初回アップロード |
| 2026-04-15 | v1.1 | reBot_B601_DM_v1.1_20260415.step | エンドジョイント3つのモーターにケーブル拘束を追加し、緩みや外れを防止。ジョイント1のモデルを4310から4340Pに修正。ベース剛性を高めるため、底部にCNCパーツ 02_Base_Reinforcement_Part.step を追加。 |

このBOMは、大疆43シリーズモーターを使用する reBot Arm B601 DM ロボットアーム用です。もう一方のバージョンである reBot Arm B601 RS は RobStride モーターを使用しています。[BOMはこちら](../reBot_B601_RS/README.md)をご覧ください。

# 📦 ファイル構成
*   3D_Printed_Parts/: すべての3Dプリント部品のStepファイル。
*   Metal_Parts/: すべてのCNC加工金属部品のStepファイル。
*   Purchased_Parts/: すべての購入部品のStepファイル。
*   reBot_B601_DM_v1.1_20260415.step: ロボットアームのフルアセンブリファイル。

# 🛒[全部品を入手](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html)
- 5種類のキットオプションを提供しています：
  - **アームボディモーターキット**: ロボットアーム用のモーターと配線ハーネスのみを含む。
  - **アームボディ構造キット**: 機械的構造部品のみを含む。
  - **グリッパーコンプリートキット**: グリッパー用のモーター、配線ハーネス、構造部品を含む。
  - **フルキット**: ロボットアーム本体とグリッパーの完全なセットを含む。
  - **組立済みロボットアーム**: 完全に組み立てられた完成品のロボットアーム。

# 📊 部品表 (BOM)

> [!WARNING]
> 宣言: 公開されているBOMは、Seeedからの最終出荷バージョンを**示すものではありません**。このオープンソースv1.1は、開発者が最小コストで再現できるように最適化されており、一部の必須でない詳細は簡略化されています。
> Seeedの最終生産バージョンには、誤動作防止のための金属レーザー刻印、耐久性のために一部の3Dプリント部品を金属に置き換え、工場でのばらつきに対応するためのクリアランスと加工公差の調整（精度とコストのバランス）、および追加コストでのカスタム配線（例：組み紐スリーブ保護）が含まれます。ただし、機械的構造は同一です。

---

## 🖨️ 3Dプリント部品

| 部品説明 | 画像 | ファイル名 | 材料 | 数量 | 注記 |
|----------|------|--------|------|----------|------|
| ロボットアームベースプラットフォーム | <img src="./3D_Printed_Parts/images/02-BASE.png" width="80"> | 01_BASE_Plate.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| ロボットアームベースリンク | <img src="./3D_Printed_Parts/images/02-BASE_02.png" width="80"> | 01_BASE_Link.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| 上アーム左フィラー | <img src="./3D_Printed_Parts/images/02-DOWN_TRIM_1.png" width="80"> | 01_Upper_Arm_Fuller_L.step | Bambu PLA Black & Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| 上アーム右フィラー | <img src="./3D_Printed_Parts/images/02-DOWN_TRIM_2.png" width="80"> | 01_Upper_Arm_Fuller_R.step | Bambu PLA Black & Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| 上アーム中央フィラー | <img src="./3D_Printed_Parts/images/02-DOWN-FILLING.png" width="80"> | 01_Upper_Arm_Fuller_M.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| 上アーム水平リミットブロック | <img src="./3D_Printed_Parts/images/02-SPACER-DOWN.png" width="80"> | 01_Upper_Arm_Limit.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| アームハンドル | <img src="./3D_Printed_Parts/images/02-HANDLE.png" width="80"> | 01_Arm_Handle.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| 下アーム左フィラー | <img src="./3D_Printed_Parts/images/02-UP-TRIM_1.png" width="80"> | 01_Lower_Arm_Filler_L.step | Bambu PLA Black & Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| 下アーム右フィラー | <img src="./3D_Printed_Parts/images/02-UP-TRIM_2.png" width="80"> | 01_Lower_Arm_Filler_R.step | Bambu PLA Black & Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| 下アーム中央フィラー | <img src="./3D_Printed_Parts/images/02-UP-FILLING.png" width="80"> | 01_Lower_Arm_Filler_M.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| 上アームカバー | <img src="./3D_Printed_Parts/images/02-DOWN-COVER.png" width="80"> | 01_Upper_Arm_Cover.step | Bambu PLA Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| 下アームカバー | <img src="./3D_Printed_Parts/images/02-UP-COVER.png" width="80"> | 01_Lower_Arm_Cover.step | Bambu PLA Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| モーター5保護カバー | <img src="./3D_Printed_Parts/images/02-MOTOR-COVER.png" width="80"> | 01_Motor_Cover.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| グリッパー水平リミット | <img src="./3D_Printed_Parts/images/02-SPACER.png" width="80"> | 01_Lower_Arm_Limit.step | Bambu PLA Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| グリッパースライダーサポートブラケット | <img src="./3D_Printed_Parts/images/02-3D-RAIL-BRACKET.png" width="80"> | 01-Rail-Bracket.step | Bambu PLA Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| グリッパーフィンガー | <img src="./3D_Printed_Parts/images/02-CLIP_1.png" width="80"> | 01_Finger.step | Bambu ABS Black | 2 | 0.4mmノズル、0.2mmレイヤー高さ、45%インフィル |
| モーター5 ケーブル拘束 | <img src="./3D_Printed_Parts/images/01_Joint5_Cable Restraint_A.png" width="80"> | 01_Joint5_Cable Restraint_A.step | Bambu PLA Green | 1 | 0.4mmノズル、0.2mmレイヤー高さ、15%インフィル |
| モーター6＆7 ケーブル拘束 A | <img src="./3D_Printed_Parts/images/01_Joint6_7_Cable Restraint_A.png" width="80"> | 01_Joint6_7_Cable Restraint_A.step | Bambu ABS Black | 2 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| モーター6＆7 ケーブル拘束 B | <img src="./3D_Printed_Parts/images/01_Joint6_7_Cable Restraint_B.png" width="80"> | 01_Joint6_7_Cable Restraint_B.step | Bambu ABS Black | 2 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |
| - | 参考価格 | 平均 **50$** | | | 材料費と印刷時間により価格変動 |

## 📷 対応カメラマウント

| 部品説明 | 画像 | ファイル名 | 材料 | 数量 | 注記 |
|----------|------|--------|------|----------|------|
| [Orbbec Gemini2](https://www.seeedstudio.com/Orbbec-Gemini-2-3D-Camera-p-6464.html) | <img src="./3D_Printed_Parts/images/Gemini2_mount.png" width="80"> | Gemini2_mount.step | Bambu ABS Black | 1 | 0.4mmノズル、0.2mmレイヤー高さ、30%インフィル |

### 🧩 印刷推奨事項
- レイヤー高さ: 0.2 mm
- ノズル: 0.4 mm
- サポート: 必要に応じて追加
- 材料: 高温・耐荷重部品にはABS（インフィル30～80%）、ナイロンまたはカーボン繊維強化材料も可。外装部品にはPLA（インフィル15%）。
- 耐荷重部品の推奨材料：

---

## 🔩 CNC加工金属部品

> [!WARNING]
> 注記に記載されている一部の部品は3Dプリントに置き換え可能で、コストを大幅に削減できます。

| 部品説明 | 画像 | ファイル名 | 材料 | 数量 | 加工 | 注記 |
|----------|------|--------|----------|------|------|------|
| モーター1 ベアリングマウント | <img src="./Metal_Parts/images/02_Base_Reinforcement_Part.png" width="80"> | 02_Base_Reinforcement_Part.step | アルミニウム合金 5052 | 1 | CNC | コスト削減のため、高インフィルABSで3Dプリント可能 |
| モーター1 回転軸 | <img src="./Metal_Parts/images/02_Arm_Yaw_Limit.png" width="80"> | 02_Arm_Yaw_Limit.step | アルミニウム合金 5052 | 1 | CNC | ヨー角運動制限を追加 |
| モーター2–5 フロントスペーサー | <img src="./Metal_Parts/images/02_Motor_Front_Spacer.png" width="80"> | 02_Motor_Front_Spacer.step | アルミニウム合金 5052 | 4 | CNC | ABS、インフィル30%で3Dプリント可能 |
| モーター2–4 リアスペーサー | <img src="./Metal_Parts/images/02_Motor_Back_Spacer.png" width="80"> | 02_Motor_Back_Spacer.step | アルミニウム合金 5052 | 3 | CNC | |
| モーター2–4 リアフランジ | <img src="./Metal_Parts/images/02_FLANGE.png" width="80"> | 02_FLANGE.step | アルミニウム合金 5052 | 3 | CNC | |
| 手首モーター5 ブラケット | <img src="./Metal_Parts/images/02_Wrist_Bracket.png" width="80"> | 02_Wrist_Bracket.step | アルミニウム合金 5052 | 1 | CNC | |
| グリッパーコネクタ A | <img src="./Metal_Parts/images/02_Gripper_Connector_A.png" width="80"> | 02_Gripper_Connector_A.step | アルミニウム合金 5052 | 1 | CNC | |
| グリッパーコネクタ B | <img src="./Metal_Parts/images/02_Gripper_Connector_B.png" width="80"> | 02_Gripper_Connector_B.step | アルミニウム合金 5052 | 1 | CNC | |
| グリッパースライダー金属ブラケット | <img src="./Metal_Parts/images/02_Slider_Bracket.png" width="80"> | 02_Slider_Bracket.step | アルミニウム合金 5052 | 1 | CNC | 高インフィルABSで3Dプリント可能だが、長期使用は非推奨 |
| スライダーからグリッパーへの延長部 | <img src="./Metal_Parts/images/02_Slider_Extension.png" width="80"> | 02_Slider_Extension.step | アルミニウム合金 5052 | 2 | CNC | |
| 上下アームリンク左 | <img src="./Metal_Parts/images/02_Lower_Upper_Link_L.png" width="80"> | 02_Lower_Upper_Link_L.step | アルミニウム合金 5052 | 1 | CNC | |
| 上下アームリンク右 | <img src="./Metal_Parts/images/02_Lower_Upper_Link_R.png" width="80"> | 02_Lower_Upper_Link_R.step | アルミニウム合金 5052 | 1 | CNC | |
| 下アーム-手首リンク左 | <img src="./Metal_Parts/images/02_Lower_Wrist_Link_L.png" width="80"> | 02_Lower_Wrist_Link_L.step | アルミニウム合金 5052 | 1 | CNC | |
| 下アーム-手首リンク右 | <img src="./Metal_Parts/images/02_Lower_Wrist_Link_R.png" width="80"> | 02_Lower_Wrist_Link_R.step | アルミニウム合金 5052 | 1 | CNC | |
| ギアコネクタ | <img src="./Metal_Parts/images/02_Gear_Connector.png" width="80"> | 02_Gear_Connector.step | アルミニウム合金 5052 | 1 | CNC | |
| ラック | <img src="./Metal_Parts/images/Rack.png" width="80"> | 02_Rack.step | アルミニウム合金 5052 | 2 | CNC | |
| リンク 1 | <img src="./Metal_Parts/images/Link1.png" width="80"> | 03_Link1.step | アルミニウム合金 5052 | 1 | CNC + 板金 | |
| リンク 2 | <img src="./Metal_Parts/images/Link2.png" width="80"> | 03_Link2.step | アルミニウム合金 5052 | 2 | CNC + 板金 | |
| リンク 3 左 | <img src="./Metal_Parts/images/Link3_L.png" width="80"> | 03_Link3_L.step | アルミニウム合金 5052 | 1 | CNC + 板金 | |
| リンク 3 右 | <img src="./Metal_Parts/images/Link3_R.png" width="80"> | 03_Link3_R.step | アルミニウム合金 5052 | 1 | CNC + 板金 | |
| リンク 5 | <img src="./Metal_Parts/images/Link5.png" width="80"> | 03_Link5.step | アルミニウム合金 5052 | 1 | CNC + 板金 | |
| - | 市場参考価格 | 平均 **250$** | | | アルミニウムコスト、公差要件、納期により価格変動 |

### 🧩 加工仕様
- 主要寸法公差: ±0.02 mm GB/T1840-M
- 表面仕上げ: アルマイト / サンドブラスト
- 嵌合部品推奨: H7 / インターフェリンスフィット
---

## 🛒 購入部品 (標準部品)

> [!WARNING]
> 組み立て・ネジ締めはご自身で行っていただく必要があるため、標準的な六角穴付きネジを選択しています。長時間の動作後、ネジが緩み、ロボットアームの精度に影響を与える可能性があります。そのため、各ジョイントのネジにネジロックを行うためのホットメルト接着剤を別途購入する必要があります。

電動ドリルなどの工具をお持ちの場合は、代わりにロックワッシャーやネジロック剤付きネジを購入しても構いません。ただし、電動ドライバーを使用する際は**非常に重要なこと**ですが、ネジ山をなめないように最も低いトルク設定を使用してください。ネジ山をなめると、元に戻せない損傷が発生します。

| 名前 | 仕様 / モデル | 数量 | 参考価格 | 注記 |
|------|----------|------|----------|------|
| ブラシレスモーター | DM4310(V4) | 4 | 120 $/unit | [SeeedStudio](https://www.seeedstudio.com/DIP-Servo-Motor-24V-120RPM-Brushless-98-9mm-4P-L56-W56-H46mm-p-6660.html) |
| ブラシレスモーター | DM4340P(V4) | 3 | 175 $/unit | [SeeedStudio](https://www.seeedstudio.com/DM4340P-Actuator-p-6663.html) |
| CAN-USBドライバーボード | | 1 | 15 $/unit | [SeeedStudio](https://www.seeedstudio.com/DM-CAN-USB-Driver-Borad-p-6706.html) |
| ベアリング | 6707ZZ | 1 | 13 $/unit | [Amazon](https://www.amazon.com/uxcell-35x44x5mm-Shielded-Precision-Lubricated/dp/B0D6WBMW3F/ref=sr_1_1) |
| ベアリング | 6803ZZ | 3 | 13 $/unit | [Amazon](https://www.amazon.com/uxcell-17x26x5mm-Shielded-Precision-Lubricated/dp/B0D54JSWBZ/ref=sr_1_1) |
| ベアリング | AXK5578 | 1 | 12 $/unit | [Amazon](https://www.amazon.com/PZRT-AXK5578-Thrust-Bearings-Washers/dp/B0B3M3RZGW/ref=sr_1_1) |
| リニアレール | MGN9-170mm | 1 | 23 $/unit | [Amazon](https://www.amazon.com/uxcell-Sliding-Carriage-Bearing-Printers/dp/B0D54L45WM/ref=sr_1_1) |
| スライダーブロック | MGN9 | 2 | 10 $/unit | [Amazon](https://www.amazon.com/uxcell-Bearing-Sliding-Carriage-Anti-Fall/dp/B0D9QBQDKB/ref=sr_1_8) |
| ギア | モジュール1、ボス型、16歯、ボア6mm | 1 | 44$/unit | [Amazon](https://www.amazon.com/Module-15-Teeth-Finished-Perforation/dp/B0GDSR1LKM/ref=sr_1_1) |
| シリコンパッド | 30x9x2mm | 1 | 10 $ | [Amazon](https://www.amazon.com/Self-Adhesive-Anti-Sliding-Anti-Scratch-Protectors-Appliances/dp/B0F9KVYXFZ/ref=sr_1_3) |
| ネジ | HM3-12mm ネジ | 14+ | | [Amazon](https://www.amazon.com/BNUOK-120pcs-Stainless-Threads-Spanner/dp/B0DJQGMQZM/ref=sr_1_4) |
| ネジ | HM3-25mm ネジ | 14+ | | [Amazon](https://www.amazon.com/BNUOK-120pcs-Stainless-Threads-Spanner/dp/B0DJQFGRPQ/ref=sr_1_4) |
| ネジ | HM3-6mm ネジ | 16+ | | [Amazon](https://www.amazon.com/BNUOK-120pcs-Stainless-Threads-Spanner/dp/B0DJQG5YLF/ref=sr_1_4) |
| ネジ | HM4-75mm 止めネジ | 4+ | | [Amazon](https://www.amazon.com/iexcell-Partially-Threaded-Thread-Socket/dp/B0DR1NX178/ref=sr_1_1) |
| ネジ | KM3*12mm ネジ | 30+ | | [Amazon](https://www.amazon.com/Uxcell-a16011300ux0872-M3x12mm-Carbon-Countersunk/dp/B01E6EIC2S/ref=sr_1_1) |
| ネジ | KM3*16mm ネジ | 34+ | | [Amazon](https://www.amazon.com/Uxcell-a16011300ux0872-M3x12mm-Carbon-Countersunk/dp/B01E6EIC2S/ref=sr_1_1) |
| ネジ | KM3*7mm ネジ | 76+ | | [Amazon](https://www.amazon.com/Uxcell-a16011300ux0872-M3x12mm-Carbon-Countersunk/dp/B01E6EIC2S/ref=sr_1_1) |
| ネジ | KM3*9mm ネジ | 31+ | | [Amazon](https://www.amazon.com/Uxcell-a16011300ux0872-M3x12mm-Carbon-Countersunk/dp/B01E6EIC2S/ref=sr_1_1) |
| ネジ | KM3*8mm マイクロプロファイル六角穴付きネジ | 31+ | | [Amazon](https://www.amazon.com/SMALLRIG-Screw-Screws-12pcs-Pack/dp/B01MS60KSY/ref=sr_1_1) |
| ネジ | KA3*12mm | 72+ | | [Amazon](https://www.amazon.com/uxcell-Phillips-Tapping-Screws-Silver/dp/B01MXSS95N/ref=sr_1_3) |
| 位置決めピン | M4*8mm | 数本 | | [Amazon](https://www.amazon.com/HARFINGTON-Stainless-Cylindrical-Furniture-Installation/dp/B0F6CWL4MP/ref=sr_1_6) |
| 位置決めピン | M4*12mm | 数本 | | [Amazon](https://www.amazon.com/HARFINGTON-Stainless-Cylindrical-Furniture-Installation/dp/B0F6CWL4MP/ref=sr_1_6) |
| ドライバーセット | 六角レンチセット | 1 | 16$ | [Amazon](https://www.amazon.com/Amazon-Basics-Ratcheting-Electronics-Screwdriver/dp/B07V4TFWFZ/ref=sr_1_2) |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 350mm | 2 | 4 $/cable | 両端アングル |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 350mm | 1 | 4 $/cable | 一端アングル、一端ストレート |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 200mm | 3 | 4 $/cable | 両端アングル |
| <img src="./Purchased_Parts/XT30_2+2.png" width="80"> | XT30 2+2 200mm | 1 | 3 $/cable | 両端ストレート |
| 木工用クランプ | 6インチGクランプ | 2 | 20 $/unit | [Amazon](https://www.amazon.com/gp/aw/d/B092J1YW2M/) |
| 電源 | 24V 14.6A | 1 | 30$ | [Amazon](https://www.amazon.com/MEAN-WELL-LRS-350-24-350-4W-Switchable/dp/B013ETVO12/ref=sr_1_1) |
| 電源ケーブル | 12AWG | 1 | 30 $ | [Amazon](https://www.amazon.com/Pinfox-Universal-Appliance-Replacement-Pigtail/dp/B0F5PW5SJG/ref=sr_1_6) |
| 電源ケーブル | XT30 16awg | 1 | 9 $ | [Amazon](https://www.amazon.com/RioRand-Connector-Pigtail-Silicone-Aircraft/dp/B0FY2ZCR83/ref=sr_1_8) |

---