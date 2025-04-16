import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent  implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChildren('animSection') sections!: QueryList<ElementRef>;

  items = [
    { title: 'Respiratorias', text: 'EPOC, asma, neumonía, bronquitis, TEP.', icon: '/assets/icons/pulmones-icon.svg' },
    { title: 'Neurológicas', text: 'ACV, cefalea, epilepsia, trastornos del sueño.', icon: '/assets/icons/cerebro-icon.svg' },
    { title: 'Endocrino-metabólicas', text: 'Diabetes, hipotiroidismo, obesidad, osteoporosis.', icon: '/assets/icons/sangre-icon.svg' },
    { title: 'Cardiovasculares', text: 'Hipertensión, insuficiencia cardíaca, arritmias, colesterol alto.', icon: '/assets/icons/corazon-icon.svg' },
    { title: 'Infecciosas', text: 'IVU, IRA, sepsis, tuberculosis, celulitis.', icon: '/assets/icons/virus-icon.svg' }
  ];

  duplicatedItems: any[] = [];
  translateX = 0;
  speed = 0.5; // píxeles por frame
  animationFrameId: any;

  ngOnInit() {
    // duplicar las tarjetas para lograr efecto infinito
    this.duplicatedItems = [...this.items, ...this.items];

    this.animate();
  }

  animate() {
    this.translateX -= this.speed;

    // Reiniciar cuando hemos desplazado una "ronda"
    const totalWidth = this.items.length * (250 + 16); // ancho tarjeta + margin
    if (Math.abs(this.translateX) >= totalWidth) {
      this.translateX = 0;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            // Para animar solo una vez y dejarla:
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // empieza cuando se ve un 10%
      }
    );

    this.sections.forEach(section => observer.observe(section.nativeElement));
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}