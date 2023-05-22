import { Component } from '@angular/core';
import { AnimationDirection, AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
	selector: 'search-lottie',
	styleUrls: ['./loading-dots.component.css'],
	template: `
		<div class="flex flex-col gap-4 justify-center items-center">
			<ng-lottie
				[height]="'300px'"
				[width]="'300px'"
				[options]="options"
				mode="bounce"
				(animationCreated)="animationCreated($event)"
			></ng-lottie>
			<div class="flex flex-row gap-2">
				<p class="title-lg-black searching-text">Buscando</p>
				<div class="dots-container">
					<div class="dot dot-1"></div>
					<div class="dot dot-2"></div>
					<div class="dot dot-3"></div>
				</div>
			</div>
		</div>
	`
})
export class LottieSearchComponent {
	options: AnimationOptions = {
		path: 'https://assets4.lottiefiles.com/packages/lf20_LKXG6QRgtE.json',
		rendererSettings: {
			progressiveLoad: true
		},
		autoplay: true,
		loop: true,
		renderer: 'svg'
	};

	private animationItem!: AnimationItem;
	private animationDirection: AnimationDirection = 1;

	animationCreated(animationItem: AnimationItem): void {
		this.animationItem = animationItem;
		animationItem.setSpeed(1);
		/* animationItem.autoplay;
		animationItem.playDirection; */
		animationItem.addEventListener('enterFrame', () => {
			this.checkAndToggleAnimationDirection();
		});
	}

	checkAndToggleAnimationDirection(): void {
		if (this.animationItem) {
			const currentFrame = this.animationItem.currentFrame;
			const totalFrames = this.animationItem.totalFrames;

			if (currentFrame === 0 || currentFrame >= totalFrames - 1) {
				this.animationDirection = this.animationDirection === 1 ? -1 : 1;
				this.animationItem.setDirection(this.animationDirection);
			}
		}
	}
}
