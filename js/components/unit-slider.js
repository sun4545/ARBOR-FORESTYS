// Unit Image Slider 기능
class UnitSlider {
  constructor(unitSelector) {
    this.unit = document.querySelector(unitSelector);
    if (!this.unit) return;
    
    this.slider = this.unit.querySelector('.unit-1-image-slider, .unit-2-image-slider');
    this.images = this.unit.querySelectorAll('.unit-1-main-image, .unit-2-main-image');
    this.pagination = this.unit.querySelector('.unit-pagination');
    this.dots = this.unit.querySelectorAll('.unit-pagination-dot');
    this.prevBtn = this.unit.querySelector('[data-icon-button*="prev"]');
    this.nextBtn = this.unit.querySelector('[data-icon-button*="next"]');
    
    this.currentSlide = 0;
    this.totalSlides = this.images.length;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateSlider();
  }
  
  bindEvents() {
    // 이전/다음 버튼 이벤트
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // 페이지네이션 도트 클릭 이벤트
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // 터치/스와이프 이벤트
    this.slider.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.slider.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.slider.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // 마우스 이벤트 (데스크톱)
    this.slider.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.slider.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.slider.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.slider.addEventListener('mouseleave', this.handleMouseUp.bind(this));
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }
  
  updateSlider() {
    // 이미지 업데이트
    this.images.forEach((img, index) => {
      img.classList.toggle('active', index === this.currentSlide);
    });
    
    // 페이지네이션 업데이트
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  // 터치 이벤트 처리
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.isDragging = false;
  }
  
  handleTouchMove(e) {
    if (!this.touchStartX) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const diffX = this.touchStartX - touchCurrentX;
    const diffY = this.touchStartY - touchCurrentY;
    
    // 수평 스와이프인지 확인
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      this.isDragging = true;
      e.preventDefault();
    }
  }
  
  handleTouchEnd(e) {
    if (!this.touchStartX || !this.isDragging) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = this.touchStartX - touchEndX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    
    this.touchStartX = null;
    this.isDragging = false;
  }
  
  // 마우스 이벤트 처리 (데스크톱)
  handleMouseDown(e) {
    this.mouseStartX = e.clientX;
    this.mouseStartY = e.clientY;
    this.isDragging = false;
    e.preventDefault();
  }
  
  handleMouseMove(e) {
    if (!this.mouseStartX) return;
    
    const mouseCurrentX = e.clientX;
    const mouseCurrentY = e.clientY;
    const diffX = this.mouseStartX - mouseCurrentX;
    const diffY = this.mouseStartY - mouseCurrentY;
    
    // 수평 드래그인지 확인
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      this.isDragging = true;
    }
  }
  
  handleMouseUp(e) {
    if (!this.mouseStartX || !this.isDragging) return;
    
    const mouseEndX = e.clientX;
    const diffX = this.mouseStartX - mouseEndX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    
    this.mouseStartX = null;
    this.isDragging = false;
  }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  // Unit 1 슬라이더 초기화
  new UnitSlider('.unit-1');
  
  // Unit 2 슬라이더 초기화
  new UnitSlider('.unit-2');
  
  console.log('Unit 슬라이더가 초기화되었습니다.');
});
