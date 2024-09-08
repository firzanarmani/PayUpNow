import { useState } from "react";
import { css } from "@payupnow/styled-system/css";
import { Button } from "../primitives/button";

export function CounterButton(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div
      className={css({
        background: "rgba(0,0,0,0.05)",
        borderRadius: "lg",
        padding: "6",
        fontWeight: "medium",
      })}
    >
      <p className={css({ marginBottom: "6" })}>
        This component is from{" "}
        <code
          className={css({
            paddingY: "0.2rem",
            paddingX: "0.3rem",
            background: "rgba(0,0,0,0.1)",
            borderRadius: "sm",
          })}
        >
          ui
        </code>
      </p>
      <div>
        <Button
          onClick={() => {
            setCount((c) => c + 1);
          }}
          className={css({
            background: "black",
            color: "white",
            border: "none",
          })}
          type="button"
        >
          Count: {count}
        </Button>
      </div>
    </div>
  );
}
