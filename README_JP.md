# 🦾 reBot-DevArm：すべての開発者のためのオープンソースロボットアーム

<p align="center">
  <img src="./media/v1.0.png" alt="reBot-DevArm バナー">
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
  <strong>100% 完全オープンソース · Embodied AI · ハードウェア・ソフトウェア統合 · 個人利用/教育利用は無料 · 商用利用には認可が必要</strong>
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
    <img src="https://img.shields.io/badge/Documentation-📕-blue" alt="ロボティクス wiki"></a>
</p>


## 📖 はじめに

**reBot-DevArm（reBot Arm B601 DM および reBot Arm B601 RS）** は、Embodied AI の学習ハードルを下げることに取り組むロボットアームプロジェクトです。私たちは **「真のオープンソース」** に重点を置いています。コードだけでなく、あらゆるものを惜しみなくオープンソース化します：
- 🦾 **2つのロボットアームバージョン**：同一の外観を持つ2種類のロボットアーム、**Robostride** と **Damiao** の両バージョンについて、すべてのオープンソースファイルを提供します。
- 🛠️ **ハードウェア設計図**：板金部品および3Dプリント部品のソースファイル。
- 🔩 **BOM リスト**：すべてのネジの仕様や購入リンクに至るまで詳細に記載。
- 💻 **ソフトウェア & アルゴリズム**：Python SDK、ROS1/2、Isaac Sim、LeRobot など。

## ご自身のreBot Armを入手するには

- 5種類のキットをご用意しています [Seeedstudio.com](https://www.seeedstudio.com/reBot-Arm-B601-DM-Bundle.html)
  - **アーム本体モーターキット**：モーターとワイヤーハーネスのみを含むキット
  - **アーム本体構造部品キット**：構造部品のみを含むキット
  - **アームグリッパーフルキット**：グリッパー用モーター、配線、構造部品を含むキット
  - **フルキット**：アーム本体とグリッパーをセットにしたフルセット
  - **組立済みアーム**：完成品として組み立てられたロボットアーム

- [Leader Arm](https://www.seeedstudio.com/Star-Arm-102-p-6765.html) もご購入いただけます

## 🗺️ ロードマップ & ステータス

私たちは、主流のロボット開発エコシステムへの継続的なメンテナンスと適応に取り組んでいます。以下は、現在の対応状況と予定リリーススケジュールです。

### reBot Arm B601 DM
| 対応エコシステム | 状態 | 説明 / 予定公開日 | 関連ドキュメント |
| :--- | :---: | :--- | :--- |
| **モーター基本使用** | ✅ 完了 | 基本的なモーション制御と API ラッパー化 | [Damiao Technology](https://wiki.seeedstudio.com/cn/damiao_series/) |
| **新バージョン STEP 3D 構造部品および BOM のオープンソース化** | ✅ 完了 | 新バージョンの全パーツの STEP ファイル、部品 BOM、およびすべての加工部品の参考価格 | [reBot Arm B601-DM BOM](./hardware/reBot_B601_DM/readme_jp.md) |
| **実機性能テスト参考** | ✅ 完了  | 通常動作および限界動作におけるロボットアームの性能参考 |[Performance Testing](./hardware/reBot_B601_DM/performance_testing/Performance_Testing_JP.md) |
| **組み立て動画** | ✅ 完了 | 超詳細な組み立て手順と動画 | [reBot Arm B601-DM の使い始め](https://wiki.seeedstudio.com/ja/rebot_b601_dm_getting_started/) |
| **ROS2 (Humble)** | 🚧 進行中  | コアドライバはすでに完成しており、現在 MoveIt2 を最適化中です | [予定：2026.04.20] |
| **Python SDK** | ✅継続的な最適化、PR歓迎 | Robstride、Damiao、脉塔（モータ）、高擎（ゴーチン）、Hexfellow など各種モーターの読み書きと制御をワンストップで統合しています。 |[MotorBridgeの使い方入門チュートリアル](https://motorbridge.seeedstudio.com) および [Web UI](https://rebot-devarm.w0x7ce.eu/) |
| **Pinocchio 対応** | ✅ 完了   | Pinocchio フレームワークへの対応を行い、ロボットアームの順運動学/逆運動学および重力補償機能を実現 |[reBot Arm B601-DM 向け Pinocchio と MeshCat 入門](https://wiki.seeedstudio.com/ja/rebot_arm_b601_dm_pinocchio_meshcat/) および [Github 制御コード](https://github.com/vectorBH6/reBotArm_control_py) |
| **Isaac Sim シミュレーション** | 🚧 進行中  | USD モデルをインポートし、シミュレーションによる遠隔操作を実現 | [予定：2026.04.20] |
| **LeRobot 対応** | ✅ 完了  | Hugging Face LeRobot 学習フレームワークへの対応 | [LeRobot ベースの reBot Arm B601-DM と reBot 102 Leader 入門](https://wiki.seeedstudio.com/ja/rebot_arm_b601_dm_lerobot/) |
| **深度カメラ統合** | ✅ 完了 | YOLO と深度カメラに基づくビジュアル把持デモ | [Getting Started with Visual Grasping Demo](https://wiki.seeedstudio.com/rebot_arm_b601_dm_grasping_demo/) |
| **最新アルゴリズムの段階的更新** | ⏳ 計画中 | 主流アルゴリズムを段階的に更新予定 | 継続中 |
| **完全無料コースシリーズの提供** | ⏳ 計画中 | 主流アルゴリズムを段階的に更新予定 | 継続中 |



### reBot Arm B601 RS

| 対応エコシステム | 状態 | 説明 / 予定公開日 | 関連ドキュメント |
| :--- | :---: | :--- | :--- |
| **モーター基本使用** | ✅ 完了 | 基本的なモーション制御と API ラッパー化 | [Robstride](https://wiki.seeedstudio.com/cn/robstride_control/) |
| **新バージョン STEP 3D 構造部品および BOM のオープンソース化** | 🚧 進行中 | 新バージョンの全パーツの STEP ファイル、部品 BOM、およびすべての加工部品の参考価格 | 予定 [2026.05] |
| **組み立て動画** | 🚧 進行中 | 超詳細な組み立て手順と動画 | [予定 2026.05] |
| **ROS2 (Humble)** | ⏳ 計画中 | コアドライバはすでに完成しており、現在 MoveIt2 を最適化中です | [予定 2026.05] |
| **LeRobot 対応** | ⏳ 計画中 | Hugging Face LeRobot 学習フレームワークへの対応 | [予定 2026.05] |
| **Pinocchio 対応** | ⏳ 計画中 | Pinocchio フレームワークへの対応を行い、ロボットアームの順運動学/逆運動学および重力補償機能を実現 | [予定 2026.05] |
| **Isaac Sim シミュレーション** | ⏳ 計画中 | USD モデルをインポートし、シミュレーションによる遠隔操作を実現 | [予定 2026.05] |
| **最新アルゴリズムの段階的更新** | ⏳ 計画中 | 主流アルゴリズムを段階的に更新予定 | 継続中 |
| **完全無料コースシリーズの提供** | ⏳ 計画中 | 主流アルゴリズムを段階的に更新予定 | 継続中 |


---

## ⚙️ ハードウェア仕様

reBot-DevArm は、デスクトップ向け Embodied AI アプリケーションのために設計されており、可搬重量と柔軟性のバランスを取っています。

| パラメータ | reBot Arm B601-DM |
| :--- | :--- |
| **推奨連続可搬重量** | アーム到達範囲ワークスペースの 70% 以内で 1.5 kg 未満 |
| **推奨可搬重量** | **1.5 kg** |
| **最大リーチ** | **650 mm** |
| **重量** | 約 4.5 kg |
| **繰り返し精度** | < 0.2 mm |
| **自由度（DOF）** | 6 DOF + 1 グリッパー（オープンソース CAN サーボグリッパーおよび関節モーターグリッパーは近日公開予定） |
| **対応プラットフォーム/エコシステム** | ROS1、ROS2、LeRobot、Pinocchio、Isaac Sim、Python SDK |
| **供給電圧** | DC 24V |

## 🧹オプションパーツ
### 手首カメラマウント
| 32×32 UVCカメラ | Intel D435i | Intel D405 & Gemini 305 | Gemini 2 |
| --- | --- | --- | --- |
| 近日公開 | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D435i.jpg" height="100"> |  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/D405.jpg" height="100"> | <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Gemini2.jpg" height="100"> |
| 近日公開 | [STEPファイル](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) | [STEPファイル](/hardware/reBot_B601_DM/3D_Printed_Parts/D405_305_Mount.step) |[STEPファイル](/hardware/reBot_B601_DM/3D_Printed_Parts/D435_Gemini2_Mount.step) |

### マスターアーム（Leader Arm）対応
| Star Arm 102-LD | 各種アームの接続・互換に対応予定 |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/star_arm_102.jpg" height="100">  | 近日公開 |
|  [Githubリポジトリ](https://github.com/servodevelop/Star-Arm-102) | 近日公開 |

### DIY ソフトフィンガー
| ソフトフィンガー | 互換性統合に対応可能 |
| --- | --- |
|  <img src="/hardware/reBot_B601_DM/3D_Printed_Parts/images/Soft_Finger.png" height="100">  |近日公開|
| [フィンガー取付台(ABS/PLA)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Mount.step) 及び [フィンガー本体(TPU 95+)](/hardware/reBot_B601_DM/3D_Printed_Parts/Soft_Gripper_Finger.step)  |近日公開 |


---


### 🎓 フルスタック・ロボティクスエコシステム
reBot-DevArm は単なるロボットアームではなく、ロボティクス学習コミュニティでもあります。以下の一般向けチュートリアルを無料で共有しています：

#### 🖥️ エッジコンピューティング & メインコントロール
*   [![Jetson](https://img.shields.io/badge/NVIDIA-reComputer%20Jetson-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://wiki.seeedstudio.com/NVIDIA_Jetson/) —— **AI 推論 & 計算コア**
*   [![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-4B%20%2F%205-C51A4A?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white)](https://wiki.seeedstudio.com/raspberry-pi-devices/) —— **汎用 Linux 開発環境**
*   [![ESP32](https://img.shields.io/badge/MCU-Seeed%20XIAO%20(ESP32)-0091BD?style=for-the-badge&logo=espressif&logoColor=white)](https://wiki.seeedstudio.com/SeeedStudio_XIAO_Series_Introduction/) —— **低消費電力ワイヤレス制御ノード**

#### 📡 センサー & 周辺機器
*   **🚗 モーター & サーボ**: [Damiao / Gogo / Robstride / Mita / Feite / Fashion Star](https://wiki.seeedstudio.com/robotics_page/)
*   **👁️ ビジュアル知覚**: [深度カメラ / LiDAR / ビジョンアルゴリズム](https://wiki.seeedstudio.com/robotics_page/)
*   **👂 音声インタラクション**: [ReSpeaker マイクアレイ / 音声認識](https://wiki.seeedstudio.com/ReSpeaker_Mic_Array_v2.0/)
*   **🧭 動作 & 姿勢**: [IMU（6軸/9軸） / ジャイロスコープ / 磁力計](https://wiki.seeedstudio.com/Sensor/IMU/)
*   **🤖 総合キット**: [その他のロボティクスセンサー & ドライバ例](https://wiki.seeedstudio.com/robotics_page/)


> 👉 **[クリックして Wiki ナレッジベースへ移動](https://wiki.seeedstudio.com/)** （すべてのチュートリアルは無料で閲覧できます）

---

## 🙌 参考資料 & 謝辞
オープンソースの道は決して孤独ではありません。reBot-DevArm プロジェクトの誕生は、Seeed Studio、世界中のオープンソースコミュニティ、そして優れたハードウェアパートナーの全面的な支援なしには実現できませんでした。以下のプロジェクトとチームに最大限の敬意を表します：

### 🌍 エコシステム & ソフトウェアサポート
*   **[Seeed Studio](https://www.seeedstudio.com/)** - 包括的なハードウェアサプライチェーンと技術サポートを提供。
*   **[Hugging Face LeRobot](https://github.com/huggingface/lerobot)** - 優れたエンドツーエンドのロボット学習フレームワーク。
*   **[NVIDIA Isaac Sim](https://developer.nvidia.com/isaac/sim)** - 強力なロボットシミュレーションおよび合成データプラットフォーム。

### ⚙️ コアハードウェアパートナー
高性能なモーターおよびアクチュエータソリューションを提供してくださった以下のメーカーに感謝します：
*   **[Damiao Technology](https://www.damiaokeji.com/)**
*   **[Robstride](https://robstride.com/)**
*   **[Fashion Star](https://fashionstar.com.hk/wiki/)**

### 💡 インスピレーション
本プロジェクトは、以下の優れたオープンソースプロジェクトから大きなインスピレーションを受けています：
*   **[SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100/tree/main)**
*   **[Mobile ALOHA](https://github.com/tonyzhaozh/aloha)**
*   **[Dummy-Robot (Zhihui Jun)](https://github.com/peng-zhihui/Dummy-Robot)**
*   **[OpenArm](https://openarm.dev/)**
*   **[I2RT](https://i2rt.com/)**
*   **[TRLC-DK1](https://github.com/robot-learning-co/trlc-dk1)**

### 🎃 プロトタイプ貢献者
- **SeeedStudio AI Robotics Team's**: Yaohui Zhu (yaohui.zhu@seeed.cc)
- **SeeedStudio STU**: Wentao Dong
- **SeeedStudio STU**: Weiwei Xu
- **SeeedStudio Purchasing Department**: Fengqun Peng


### 👥 貢献者

## 私たちのトップ貢献者 
<p align="center"><a href="https://github.com/Seeed-Projects/reBot-DevArm/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Seeed-Projects/reBot-DevArm" />
</a></p>



*近日公開予定... ぜひ PR を送ってコントリビューターになってください！*

## Star 履歴

[![Star History Chart](https://api.star-history.com/svg?repos=Seeed-Projects/reBot-DevArm&type=date&legend=top-left)](https://www.star-history.com/#Seeed-Projects/reBot-DevArm&type=date&legend=top-left)

# reBot-DevArm プロジェクトライセンス

- **ハードウェア設計** © 2026 深圳矽递科技股份有限公司(SeeedStudio)、 [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) に基づきオープンソース化
- **ファームウェアコード** © 2026 深圳矽递科技股份有限公司(SeeedStudio)、 [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) に基づきオープンソース化

## 権利と制限事項の説明

尊敬する開発者ならびに業界の専門家の皆様、reBot Armロボットアームプロジェクトは、常に**機敏性、開放性、責任感、共創**という中核的理念を掲げ、開発者の皆様にサービスを提供してまいりました。私たちのビジョンは、reBotプロジェクトを通じて、すべての愛好家の皆様がロボットアームのハードウェアアーキテクチャやソフトウェアの基本原理を体系的に習得し、先端の身体性人工知能アルゴリズムを体験できるようにすることです。

プロジェクト開始から5か月間は、**CC BY-SA NC（非営利）オープンソースライセンス**を採用してきました。これは、プロジェクトが未だ完全に成熟していない段階において、すべての開発者と貢献者が商業的な要求に煩わされることなく、製品の反復改善に集中し、プロジェクトの共同構築と最適化に全力を注げるようにするためです。

SeeedStudioによる数ヶ月にわたる徹底的な製品磨きと技術的蓄積を経て、**2026年5月11日より**、reBot ArmプロジェクトはCC BY-SA NCライセンスから **CERN-OHL-W 2.0 オープンソースライセンス**へ正式に移行します。

これにより、プロジェクトは**ハードウェアとソフトウェアの全チェーンで100%オープンソース化**を実現し、**全シナリオにおける商業的な遵守使用**を許可します。

引き続き、包摂と協働の初心を持って、reBot Armオープンソースコミュニティの維持、発展、深耕にご参加いただき、オープンソースの成果を共有し、身体性人工知能のエコシステムを共に築いていけることを期待しております。

本プロジェクトでは、ハードウェアとソフトウェアで異なるオープンソースライセンスを適用します。ご使用前に該当する部分のライセンス条項をご確認ください。

| 項目 / ライセンス                       | reBotプロジェクト ハードウェア (CERN-OHL-W-2.0)                              | reBotプロジェクト ソフトウェアSDK (Apache-2.0)                              |
| --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **✅ 商用利用**                  | ✅ 許可                                               | ✅ 許可                                                 |
| **✅ 改変**                  | ✅ 許可                                               | ✅ 許可                                                 |
| **✅ 再配布**                  | ✅ 許可                                               | ✅ 許可                                                 |
| **✅ クローズドソースでの統合/再公開**       | ❌ 条件付きで許可（詳細は [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) を参照）                             | ✅ 許可（修正コードの公開は不要）                             |
| **⚠️ 著作権表示の保持**           | ✅ 必須                                           | ✅ 必須                                             |
| **⚠️ ライセンス原文の保持**         | ✅ 必須                                           | ✅ 必須                                             |
| **⚠️ 変更箇所の明示**                 | ✅ 必須（変更内容と日付を明記）                                 | ✅ 必須（変更内容を明記）                               |
| **⚠️ 特許許諾**                   | ✅ 明確な特許許諾（詳細は [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt) を参照）                           | ✅ 明確な特許許諾                                         |
| **⚠️ 配布時のソース提供要件**     | ✅ **必須**（ハードウェアの「完全なソース」を提供）        | ❌ ソース提供の義務はなし                                   |
| **⚠️ 外部/クローズドモジュールとの互換性**      | ✅ 許可（Weakly Reciprocal 特性）                     | ✅ 完全に許可                                             |
| **🔗 他のコンポーネント/モジュールとの関係**        | 独立したインターフェースモジュール（External Material）は元のライセンス（クローズドも可）を維持可能     | 無制限。あらゆるライセンスのコードライブラリとリンク可能                        |
| **📄 公式ライセンス全文**              | [CERN-OHL-W-2.0](https://ohwr.org/cern_ohl_w_v2.txt)  | [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) |

## ☎ お問い合わせ
- **オープンソース進捗 & 技術サポート**-Yaohui: yaohui.zhu@seeed.cc
- **今後の協業 & カスタマイズ**-Elaine: elaine.wu@seeed.cc
