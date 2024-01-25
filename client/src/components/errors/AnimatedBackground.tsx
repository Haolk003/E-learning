import React, { useRef, useEffect } from "react";

// Define a type for points in space
type Point = {
  x: number;
  y: number;
  dx: number; // delta x - the change in x
  dy: number; // delta y - the change in y
};

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points: Point[] = [];

  // Initialize points
  const initPoints = (ctx: CanvasRenderingContext2D) => {
    const numberOfPoints = 50;
    for (let i = 0; i < numberOfPoints; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const dx = (Math.random() - 0.5) * 2; // Speed and direction of movement in x
      const dy = (Math.random() - 0.5) * 2; // Speed and direction of movement in y
      points.push({ x, y, dx, dy });
    }
  };

  // Update points' positions and draw lines between them
  const updatePoints = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      // Update position
      p.x += p.dx;
      p.y += p.dy;

      // Reverse the movement direction if it hits the edge of the canvas
      if (p.x <= 0 || p.x >= ctx.canvas.width) p.dx *= -1;
      if (p.y <= 0 || p.y >= ctx.canvas.height) p.dy *= -1;

      // Draw the point
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1, 0, Math.PI * 2, true);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Draw lines between points
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
        if (distance < 150) {
          // adjust this value for your preferred density of lines
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`; // fade effect based on distance
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d")!;
    initPoints(ctx);

    let animationFrameId: number;

    // Animation loop
    const render = () => {
      updatePoints(ctx);
      animationFrameId = window.requestAnimationFrame(render);
    };

    // Start the animation
    render();

    // Handle window resizing
    const handleResize = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      points.length = 0; // Clear the points array
      initPoints(ctx); // Re-initialize points
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-full h-full"
      width={1000}
      height={1000}
    />
  );
};

export default AnimatedBackground;
