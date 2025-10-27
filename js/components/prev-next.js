// a.foresty Prev&Next 컴포넌트 JavaScript

class PrevNext {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      onPrev: null,
      onNext: null,
      disabledPrev: false,
      disabledNext: false,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  // Prev&Next 렌더링
  render() {
    if (!this.container) return;
    
    // 기존 HTML이 있다면 그대로 사용
    if (this.container.querySelector('.prev-next__button--prev')) {
      this.prevButton = this.container.querySelector('.prev-next__button--prev');
      this.nextButton = this.container.querySelector('.prev-next__button--next');
      return;
    }
    
    // HTML이 없다면 생성
    this.container.className = 'prev-next';
    this.container.innerHTML = `
      <button class="prev-next__button prev-next__button--prev" data-prev-next="prev" aria-label="이전">
        <img src="images/icons/Icon:24/Name=Prev.svg" alt="Previous" class="prev-next__icon">
      </button>
      
      <button class="prev-next__button prev-next__button--next" data-prev-next="next" aria-label="다음">
        <img src="images/icons/Icon:24/Name=Next.svg" alt="Next" class="prev-next__icon">
      </button>
    `;
    
    this.prevButton = this.container.querySelector('.prev-next__button--prev');
    this.nextButton = this.container.querySelector('.prev-next__button--next');
  }
  
  // 이벤트 바인딩
  bindEvents() {
    if (!this.prevButton || !this.nextButton) return;
    
    // Prev 버튼 클릭 이벤트
    this.prevButton.addEventListener('click', (e) => {
      if (!this.options.disabledPrev && this.options.onPrev) {
        this.options.onPrev();
      }
    });
    
    // Next 버튼 클릭 이벤트
    this.nextButton.addEventListener('click', (e) => {
      if (!this.options.disabledNext && this.options.onNext) {
        this.options.onNext();
      }
    });
  }
  
  // Prev 버튼 활성/비활성화
  setPrevDisabled(disabled) {
    this.options.disabledPrev = disabled;
    if (this.prevButton) {
      this.prevButton.disabled = disabled;
    }
  }
  
  // Next 버튼 활성/비활성화
  setNextDisabled(disabled) {
    this.options.disabledNext = disabled;
    if (this.nextButton) {
      this.nextButton.disabled = disabled;
    }
  }
  
  // 전체 활성/비활성화
  setDisabled(disabled) {
    this.setPrevDisabled(disabled);
    this.setNextDisabled(disabled);
  }
}

// 초기화 함수
function initPrevNext() {
  const prevNextContainers = document.querySelectorAll('.prev-next');
  
  if (prevNextContainers.length === 0) {
    console.log('Prev&Next 컴포넌트를 찾을 수 없습니다.');
    return;
  }
  
  prevNextContainers.forEach((container, index) => {
    const prevNext = new PrevNext(container);
    console.log(`Prev&Next 컴포넌트 ${index + 1}이(가) 초기화되었습니다.`);
  });
  
  console.log('Prev&Next 컴포넌트 초기화가 완료되었습니다.');
}

// 페이지 로드 시 자동 초기화
document.addEventListener('DOMContentLoaded', initPrevNext);

// 모듈 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PrevNext, initPrevNext };
}
