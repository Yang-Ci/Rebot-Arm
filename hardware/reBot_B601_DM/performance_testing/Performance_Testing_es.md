# 🧪 Referencia de pruebas de rendimiento real reBot-DevArm

<p align="center">
  <img src="./images/v1.0.png" alt="reBot-DevArm Banner">
</p>

<p align="center">
  <strong>
    <a href="./Performance_Testing_zh.md">简体中文</a> &nbsp;|&nbsp;
    <a href="./Performance_Testing.md">English</a> &nbsp;|&nbsp;
    <a href="./Performance_Testing_JP.md">日本語</a>&nbsp;|&nbsp;
    <a href="./Performance_Testing_Fr.md">français</a>&nbsp;|&nbsp;
    <a href="./Performance_Testing_es.md">Español</a>
  </strong>
</p>

> [!NOTE]
> Este documento proporciona datos de referencia de pruebas de rendimiento para el reBot Arm B601-DM en condiciones de trabajo normales y extremas.

> [!WARNING]
> **Diferencias de versión**: Esta prueba se basa en el reBot Arm B601-DM equipado con **motores Damiao versión V4**. El rendimiento de las versiones V3 y anteriores es diferente. Los datos son solo de referencia; el rendimiento real debe verificarse mediante pruebas.

---

## 📋 Índice

- [⚡ Prueba de rendimiento en condiciones extremas](#-prueba-de-rendimiento-en-condiciones-extremas)
- [📈 Curva de carga oficial](#-curva-de-carga-oficial)
- [📝 Conclusiones y recomendaciones](#-conclusiones-y-recomendaciones)
- [🙋 Preguntas frecuentes (FAQ)](#-preguntas-frecuentes-faq)
- [📅 Registro de actualizaciones](#-registro-de-actualizaciones)
- [📞 Soporte técnico](#-soporte-técnico)

---

## ⚡ Prueba de rendimiento en condiciones extremas

### Condiciones de prueba

**Prueba de movimiento dinámico**:
- Duración de una acción: 5 s
- Modo de movimiento: movimiento reciprocante
- Rango de extensión del brazo: 5%~70% / 5%~100% del alcance nominal

**Prueba de mantenimiento estático**:
- Postura de prueba: carga estática en reposo
- Extensión del brazo: 70% / 100% del alcance nominal

### Resultados de la prueba

> 👉 **Conclusión clave**: La estructura del brazo es suficientemente robusta. La finalización de la prueba se debió a la **protección por sobrecalentamiento del motor n.º 2**. Se recomienda una carga de trabajo **≤ 1.5 kg**, un alcance de trabajo **< 70%**, y el uso de refrigeración activa.

#### 1. Prueba de movimiento dinámico

| Rango del brazo | Carga | Duración | Motivo de finalización |
|----------|------|----------|----------|
| Movimiento 5%–70% | 1.5 kg | > 2 h | Motor n.º 2 alcanzó 90°C, detención manual |
| Movimiento 5%–70% | 2.5 kg | 40 min | Protección por sobrecalentamiento |
| Movimiento 5%–100% | 1.5 kg | 45 min | Protección por sobrecalentamiento |

#### 2. Prueba de mantenimiento estático

| Posición de prueba | Carga (kg) | Duración máxima | Motivo de finalización |
|----------|-----------|--------------|----------|
| Suspensión al 70% | 1.5 | 18 min | Protección por sobrecalentamiento |
| Suspensión al 100% | 1.5 | 3 min | Protección por sobrecalentamiento |

---

## 📈 Curva de carga oficial

![12Nm 负载曲线图](./images/12Nm.png)

<p align="center">Curva de carga del motor serie Damiao 43 versión 12Nm</p>

---

## 📝 Conclusiones y recomendaciones

### Recomendaciones de uso

1. **Condiciones recomendadas**
   - Carga: < 1.5 kg
   - Radio de trabajo: < 70% del alcance (450 mm)
   - Velocidad de movimiento: < 70% de la velocidad máxima
   - Temperatura ambiente: 15 °C ~ 35 °C

2. **Recomendaciones de refrigeración**
   - Añadir refrigeración activa durante trabajos prolongados con alta carga
   - Después de 2 horas de funcionamiento continuo, descansar 10~15 minutos
   - Evitar la exposición directa al sol y espacios cerrados

---

## 🙋 Preguntas frecuentes (FAQ)

<details>
<summary><b>Q1: ¿El rendimiento disminuye en ambientes de alta temperatura?</b></summary>

Sí. Cuando la temperatura ambiente supera los 35 °C o la temperatura del motor supera los 75 °C, se recomienda reducir la carga y la velocidad para garantizar la precisión y la vida útil. No se recomienda el uso prolongado en altas temperaturas.

</details>

<details>
<summary><b>Q2: ¿Los datos de prueba se aplican a todas las versiones?</b></summary>

Esta prueba se basa en la versión con **motores Damiao V4**. Las versiones V3 y anteriores presentan diferencias, por lo que los datos son solo de referencia.

</details>

---

## 📅 Registro de actualizaciones

| Versión | Fecha | Contenido de actualización | Autor |
|------|------|----------|------|
| v1.0 | 2026.04.01 | Versión inicial, publicación de datos básicos de prueba de rendimiento | Equipo AI Robotics de SeeedStudio |

---

## 📞 Soporte técnico

Si tienes cualquier pregunta relacionada con las pruebas de rendimiento, no dudes en contactarnos:

- **Soporte técnico**: yaohui.zhu@seeed.cc
- **Discord**: [Unirse a la comunidad](https://discord.gg/AbGuqJhDpQ)
- **Wiki**: [Ver base de conocimientos](https://wiki.seeedstudio.com/robotics_page/)

---

<p align="center">
  <strong>🤖 reBot-DevArm - Un brazo robótico de código abierto para cada desarrollador</strong>
</p>