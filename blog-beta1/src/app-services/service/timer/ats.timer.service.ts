import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AtsTimerService {

    private play = false;
    private pause = false;
    private stop = true;
    public playPauseStop$ = new EventEmitter();
    public timerTimeLimitExceeded = new EventEmitter();

    public playTimer(timeLimitMin: number) {
        this.play = true;
        this.pause = false;
        this.stop = false;

        this.playPauseStop$.emit({
            play: this.play,
            timeLimitMin: timeLimitMin
        });
    }

    public pauseTimer() {
        this.play = false;
        this.pause = true;
        this.stop = false;

        this.playPauseStop$.emit({
            pause: this.pause
        });
    }

    public stopTimer() {
        this.play = false;
        this.pause = false;
        this.stop = true;

        this.playPauseStop$.emit({
            stop: this.stop
        });
    }

}
