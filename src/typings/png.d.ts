// Creating a type for png file since it is non-standard extension.
// Needed to create declarations file in separate folder so typescript can recognize it
declare module '*.png' {
  const value: string;
  export default value;
}