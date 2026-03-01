"use client";

import { useEffect, useRef } from "react";
import kaplay from "kaplay";

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const k = kaplay({
      global: false,
      width: 400,
      height: 250,
      canvas: document.createElement("canvas"),
    });

    gameRef.current.appendChild(k.canvas);

    k.loadSprite("bg", "forest.png");

    k.loadSprite("wizzard0", "wizard/wizzard_f_run_anim_f0.png");
    k.loadSprite("wizzard1", "wizard/wizzard_f_run_anim_f1.png");
    k.loadSprite("wizzard2", "wizard/wizzard_f_run_anim_f2.png");
    k.loadSprite("wizzard3", "wizard/wizzard_f_run_anim_f3.png");

    k.loadSprite("necromancer0", "necromancer/necromancer_anim_f0.png");
    k.loadSprite("necromancer1", "necromancer/necromancer_anim_f1.png");
    k.loadSprite("necromancer2", "necromancer/necromancer_anim_f2.png");
    k.loadSprite("necromancer3", "necromancer/necromancer_anim_f3.png");

    k.loadSprite("explosion", "effects/explosion.png", {
      sliceX: 9,
      sliceY: 1,
      anims: {
        explode: {
          from: 0,
          to: 8,
        },
      }
    });

    k.loadSprite("fire", "effects/fire.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        fire: {
          from: 0,
          to: 7,
        },
      }
    });

    k.loadSprite("dialog", "dialog.png");

    const wizardFrames = ["wizzard0", "wizzard1", "wizzard2", "wizzard3"];
    const necromancerFrames = ["necromancer0", "necromancer1", "necromancer2", "necromancer3"];
    let wizardFrameIndex = 0;
    let necromancerFrameIndex = 0;

    k.scene("main", () => {
      k.add([
        k.sprite("bg"),
        k.pos(0, 250),
        k.anchor("botleft"),
        k.scale(0.75),
      ]);

      const wizard = k.add([
        k.sprite(wizardFrames[0]),
        k.pos(75, 150),
        k.scale(2),
      ]);

      const necromancer = k.add([
        k.sprite(necromancerFrames[0]),
        k.pos(325, 160),
        k.scale(-2.0, 2),
      ]);

      const dialog = k.add([
        k.sprite("dialog"),
        k.pos(k.width() / 2, k.height() - 25),
        k.anchor("center"),
        k.scale(1, 0.5),
        "dialog",
      ]);

      const yesDialogText = k.add([
        k.text("Yay! You have defeated the evil necromancer!"),
        k.anchor("topleft"),
        k.pos(55, 220),
        k.scale(0.3),
        k.color(0, 0, 0),
        "dialogYes",
      ]);

      const noDialogText = k.add([
        k.text("Oouch! That hurts!"),
        k.anchor("topleft"),
        k.pos(55, 220),
        k.scale(0.3),
        k.color(0, 0, 0),
        "dialogNo",
      ]);

      k.loop(0.1, () => {
        wizardFrameIndex = (wizardFrameIndex + 1) % wizardFrames.length;
        necromancerFrameIndex = (necromancerFrameIndex + 1) % necromancerFrames.length;
        wizard.use(k.sprite(wizardFrames[wizardFrameIndex]));
        necromancer.use(k.sprite(necromancerFrames[necromancerFrameIndex]));
      });

      dialog.hidden = true;
      noDialogText.hidden = true;
      yesDialogText.hidden = true;

      function handleYes() {
        // if prev. yes 
        const dialogYesElements = k.get("dialogYes");

        dialogYesElements.forEach((obj) => {
          if (obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        // if prev. no
        const dialogNoElements = k.get("dialogNo");

        dialogNoElements.forEach((obj) => {
          if (!obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        const dialogElements = k.get("dialog");

        dialogElements.forEach((obj) => {
          if (obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        k.add([
          k.sprite("explosion", { anim: "explode", },),
          k.pos(285, 167),
          k.lifespan(1.0, { fade: 0.0 }),
          k.opacity(1.0),
        ]);
      }

      function handleNo() {
        // if prev. yes 
        const dialogYesElements = k.get("dialogYes");

        dialogYesElements.forEach((obj) => {
          if (!obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        // if prev. no
        const dialogNoElements = k.get("dialogNo");

        dialogNoElements.forEach((obj) => {
          if (obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        const dialogElements = k.get("dialog");

        dialogElements.forEach((obj) => {
          if (obj.hidden) {
            obj.hidden = !obj.hidden;
          }
        });

        k.add([
          k.sprite("fire", { anim: "fire" }),
          k.pos(80, 175),
          k.lifespan(1.0, { fade: 0.0 }),
          k.opacity(1.0),
        ]);

      }

      (window as any).handleYes = handleYes;
      (window as any).handleNo = handleNo;

      k.onKeyPress(["y", "n"], (key) => {
        if (key === "y") {
          // if prev. yes 
          const dialogYesElements = k.get("dialogYes");

          dialogYesElements.forEach((obj) => {
            if (obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          // if prev. no
          const dialogNoElements = k.get("dialogNo");

          dialogNoElements.forEach((obj) => {
            if (!obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          const dialogElements = k.get("dialog");

          dialogElements.forEach((obj) => {
            if (obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          k.add([
            k.sprite("explosion", { anim: "explode", },),
            k.pos(285, 167),
            k.lifespan(1.0, { fade: 0.0 }),
            k.opacity(1.0),
          ]);

        } else if (key === "n") {
          // if prev. yes 
          const dialogYesElements = k.get("dialogYes");

          dialogYesElements.forEach((obj) => {
            if (!obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          // if prev. no
          const dialogNoElements = k.get("dialogNo");

          dialogNoElements.forEach((obj) => {
            if (obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          const dialogElements = k.get("dialog");

          dialogElements.forEach((obj) => {
            if (obj.hidden) {
              obj.hidden = !obj.hidden;
            }
          });

          k.add([
            k.sprite("fire", { anim: "fire" }),
            k.pos(80, 175),
            k.lifespan(1.0, { fade: 0.0 }),
            k.opacity(1.0),
          ]);
        }
      });

    });

    k.go("main");
  }, []);

  return <div>
    <div ref={gameRef} />
    <br></br>
    <div
      style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center", 
        fontFamily: "PixelRegular",
        fontSize: "1rem",
        gap: "1rem", 
      }}
    >
      <p style={{ margin: 0, textAlign: "center" }}>
        Would you like to be my valentine on 14th March?
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <img
          src="yes.png"
          onClick={() => (window as any).handleYes?.()}
          style={{ cursor: "pointer" }}
        />
        <img
          src="no.png"
          onClick={() => (window as any).handleNo?.()}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div></div>;
}