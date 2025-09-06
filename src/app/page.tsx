import { FrameDiv } from "@/components/ui/frame-div";

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-12 max-w-4xl mx-auto">
      <FrameDiv width="" height="" borderRadius={52}>
        <h1>Full space content</h1>
      </FrameDiv>
      <FrameDiv
        width="500px"
        height=""
        showWidthBadge={false}
        showHeightBadge={true}
        innerPadding="20px"
        className=""
      >
        <p>Only height badge shown</p>
      </FrameDiv>
      <FrameDiv
        width="300px"
        height="200px"
        showWidthBadge={false}
        showHeightBadge={false}
        showParent
        showDots
        dotSize={2}
        showBRStyle
      >
        <span>No dimension badges</span>
      </FrameDiv>
      <FrameDiv width="" height="" showParent>
        <div>Width: W: 80vw, Height: Fill Container</div>
      </FrameDiv>
      <FrameDiv childrenFullWidth>
        <span>Compact content</span>
      </FrameDiv>

      <FrameDiv childrenFullWidth={true}>
        <div className="w-full h-full flex items-center justify-center">
          Full space content
        </div>
      </FrameDiv>
    </main>
  );
}
