import { Fragment, type ReactNode } from "react";

/** Sets each " & " in a name as the Caslon italic red ampersand. Use only where the direction allows it. */
export function withAmp(text: string): ReactNode {
  const parts = text.split(" & ");
  return parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? (
        <>
          {" "}
          <span className="amp">&amp;</span>{" "}
        </>
      ) : null}
      {part}
    </Fragment>
  ));
}
