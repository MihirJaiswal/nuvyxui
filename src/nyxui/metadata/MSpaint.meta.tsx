import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import MSpaintDemo from "@/nyxui/demos/MSpaintDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MSpaint.tsx");
const mspaintSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MSpaintDemo.tsx");
const mspaintDemoSource = fs.readFileSync(demoPath, "utf8");

export const mspaintData: ComponentData = {
  name: "MS Paint",
  description:
    "A customizable drawing canvas component with paint-like interface. Perfect for sketching, drawing tools, annotations, and interactive whiteboard applications. Features include brush and eraser tools, customizable color palette, and save functionality.",
  preview: <MSpaintDemo />,
  usage: mspaintDemoSource,
  componentCode: mspaintSource,
  dependencies: [],
  props: [
    {
      name: "MS Paint",
      items: [
        {
          name: "initialWidth",
          type: "number",
          default: "800",
          description: "Width of the drawing canvas container in pixels",
        },
        {
          name: "initialHeight",
          type: "number",
          default: "500",
          description: "Height of the drawing canvas area in pixels",
        },
        {
          name: "initialBackgroundColor",
          type: "string",
          default: "'#FFFFFF'",
          description: "Initial background color of the canvas",
        },
        {
          name: "canvasWidth",
          type: "number",
          default: "2000",
          description: "Width of the actual canvas element (determines draw area)",
        },
        {
          name: "canvasHeight",
          type: "number",
          default: "2000",
          description: "Height of the actual canvas element (determines draw area)",
        },
        {
          name: "colorPalette",
          type: "string[]",
          default: "DEFAULT_COLORS",
          description: "Array of hex color codes for the color palette",
        },
        {
          name: "showWindowControls",
          type: "boolean",
          default: "true",
          description: "Whether to show the window-like controls (minimize, maximize, close)",
        },
        {
          name: "title",
          type: "string",
          default: "'untitled - Paint'",
          description: "Title text displayed in the window header",
        },
        {
          name: "menuItems",
          type: "string[]",
          default: "['File', 'Edit', 'View', 'Image', 'Options', 'Help']",
          description: "Array of menu item names to display in the menu bar",
        },
        {
          name: "statusMessage",
          type: "string",
          default: "'For Help, click Help Topics on the Help Menu.'",
          description: "Status message displayed at the bottom of the component",
        },
        {
          name: "draggable",
          type: "boolean",
          default: "true",
          description: "Whether the canvas window can be dragged around",
        },
        {
          name: "className",
          type: "string",
          default: "''",
          description: "Additional CSS classes to apply to the container",
        },
        {
          name: "style",
          type: "React.CSSProperties",
          default: "{}",
          description: "Additional inline styles to apply to the container",
        },
        {
          name: "onSave",
          type: "(canvas: HTMLCanvasElement) => void",
          default: "undefined",
          description: "Callback function when the save button is clicked",
        },
      ],
    },
    {
      name: "CustomButton",
      items: [
        {
          name: "children",
          type: "React.ReactNode",
          default: "required",
          description: "Content inside the button",
        },
        {
          name: "className",
          type: "string",
          default: "''",
          description: "Additional CSS classes to apply to the button",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Function to execute when the button is clicked",
        },
        {
          name: "title",
          type: "string",
          default: "''",
          description: "Tooltip text displayed on hover",
        },
        {
          name: "variant",
          type: '"default" | "ghost"',
          default: '"default"',
          description: "Button style variant",
        },
      ],
    },
  ],
  category: "Input",
  examples: [],
}