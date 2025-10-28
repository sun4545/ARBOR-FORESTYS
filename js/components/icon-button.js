/**
 * Icon Button 컴포넌트 JavaScript
 * 피그마 디자인 기반으로 새로 개발
 */

class IconButton {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 모든 Icon Button에 이벤트 리스너 추가
    const iconButtons = document.querySelectorAll('.icon-button');
    
    iconButtons.forEach(button => {
      // 마우스 이벤트
      button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      
      // 클릭 이벤트
      button.addEventListener('click', this.handleClick.bind(this));
      
      // 키보드 이벤트
      button.addEventListener('keydown', this.handleKeyDown.bind(this));
      
      // 포커스 이벤트
      button.addEventListener('focus', this.handleFocus.bind(this));
      button.addEventListener('blur', this.handleBlur.bind(this));
    });
  }

  handleMouseEnter(event) {
    const button = event.currentTarget;
    
    // 비활성화된 버튼은 무시
    if (button.disabled) return;
    
    // hover 클래스 추가
    button.classList.add('icon-button--hover');
  }

  handleMouseLeave(event) {
    const button = event.currentTarget;
    
    // hover 클래스 제거
    button.classList.remove('icon-button--hover');
  }

  handleClick(event) {
    const button = event.currentTarget;
    
    // 비활성화된 버튼은 무시
    if (button.disabled) return;
    
    // 커스텀 이벤트 발생
    const customEvent = new CustomEvent('iconButtonClick', {
      detail: {
        button: button,
        dataIconButton: button.getAttribute('data-icon-button'),
        ariaLabel: button.getAttribute('aria-label')
      }
    });
    
    document.dispatchEvent(customEvent);
  }

  handleKeyDown(event) {
    const button = event.currentTarget;
    
    // 비활성화된 버튼은 무시
    if (button.disabled) return;
    
    // Enter 또는 Space 키로 클릭
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.click();
    }
  }

  handleFocus(event) {
    const button = event.currentTarget;
    
    // 포커스 스타일 추가
    button.style.outline = '2px solid #7C7262';
    button.style.outlineOffset = '2px';
  }

  handleBlur(event) {
    const button = event.currentTarget;
    
    // 포커스 스타일 제거
    button.style.outline = '';
    button.style.outlineOffset = '';
  }

  // 프로그래밍 방식으로 버튼 활성화/비활성화
  setDisabled(button, disabled) {
    if (typeof button === 'string') {
      button = document.querySelector(button);
    }
    
    if (button) {
      button.disabled = disabled;
      if (disabled) {
        button.classList.add('icon-button--disabled');
      } else {
        button.classList.remove('icon-button--disabled');
      }
    }
  }

  // 버튼 상태 토글
  toggle(button) {
    if (typeof button === 'string') {
      button = document.querySelector(button);
    }
    
    if (button) {
      const isDisabled = button.disabled;
      this.setDisabled(button, !isDisabled);
    }
  }

  // 모든 버튼 비활성화/활성화
  setAllDisabled(disabled) {
    const buttons = document.querySelectorAll('.icon-button');
    buttons.forEach(button => {
      this.setDisabled(button, disabled);
    });
  }
}

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.iconButton = new IconButton();
});

// 전역으로 사용할 수 있도록 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IconButton;
}