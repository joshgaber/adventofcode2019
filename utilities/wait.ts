export default function (ms: number): void {
  const start: number = new Date().getTime()
  let end: number = start
  while (end < start + ms) {
    end = new Date().getTime()
  }
}
