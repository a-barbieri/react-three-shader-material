export class Clock {
   constructor(autoStart=true) {
      this.startTime = 0;
      if (autoStart) { this.start() }
   }

   start() {
      this.startTime = Date.now();
   }

   elapsedTime() {
      return Date.now() - this.startTime;
   }
}
