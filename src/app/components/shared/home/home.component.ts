import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../i18n/translate.pipe';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  images = [
    {
      src: 'https://res.cloudinary.com/dzuir3psc/image/upload/v1748375258/3_etcplx.jpg',
      alt: 'Outdoor Plants',
      link: '/store/Outdoor Plants',
    },
    {
      src: 'https://res.cloudinary.com/ddsrofo4o/image/upload/v1748093608/indoor-plants-studio_1_tdby3h.jpg',
      alt: 'Indoor Plants',

      link: '/store/Indoor Plants',
    },
    {
      src: 'https://res.cloudinary.com/ddsrofo4o/image/upload/v1748094722/close-up-orange-tree-with-many-leaves_n6cmld.jpg',
      alt: 'Edible Plants',

      link: '/store/Edible Plants',
    },

    {
      src: 'https://res.cloudinary.com/ddsrofo4o/image/upload/v1748081318/plants-pot-with-watering-can_p7fwzs.jpg',
      alt: 'Gardening Tools',

      link: '/store/Gardening Tools',
    },
  ];

  activeIndex = 0;

  onScroll(container: HTMLElement) {
    const scrollLeft = container.scrollLeft;
    //هذا لحساب عرض العنصر الواحد داخل الـ slider.
    //0.9 يعني إن العنصر الواحد عرضه 90% من عرض الشاشة (90vw
    const itemWidth = container.clientWidth * 0.9 + 20; // 90vw + gap
    //يقسم عدد البكسلات اللي تم تمريرها على عرض عنصر واحد → ليحسب أي عنصر هو الظاهر حاليًا (النشط).
    this.activeIndex = Math.round(scrollLeft / itemWidth);
  }
}
