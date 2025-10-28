// a.foresty 메인 JavaScript 파일

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('a.foresty 웹페이지가 로드되었습니다.');
    
    // 기본 초기화 함수
    init();
});

// 초기화 함수
function init() {
    // 반응형 처리
    handleResponsive();
    
    // 이벤트 리스너 등록
    setupEventListeners();
    
    // Navbar 스크롤 기능 초기화
    initNavbarScroll();
    
    // Hero 캐러셀 기능 초기화
    initHeroCarousel();
    
    // Brand Story Section 01 초기화
    initBrandStorySection01();
    
    // Benefit Section 초기화
    initBenefitSection();
    
    // Back to Top 버튼 초기화
    initBackToTop();
}

// 반응형 처리 함수
function handleResponsive() {
    // 화면 크기 변경 감지
    window.addEventListener('resize', function() {
        console.log('화면 크기가 변경되었습니다:', window.innerWidth);
    });
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 필요한 이벤트 리스너들을 여기에 추가
    console.log('이벤트 리스너가 설정되었습니다.');
}

// Navbar 스크롤 기능 초기화
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let isScrolling = false;
    let scrollUpCount = 0; // 스크롤업 카운터
    let scrollTimeout; // 카운터 리셋을 위한 타이머
    
    if (!navbar) return;
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollThreshold = 100; // 100px 이상 스크롤 시 배경 적용
                const minScrollDistance = 10; // 최소 스크롤 거리
                
                // 스크롤 위치에 따른 배경 적용
                if (scrollTop > scrollThreshold) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // 스크롤 방향 감지 및 카운터 로직
                if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                    // 스크롤 다운 - navbar 숨기기, 카운터 리셋
                    navbar.classList.add('scroll-down');
                    navbar.classList.remove('scroll-up');
                    scrollUpCount = 0; // 다운 스크롤 시 카운터 리셋
                    clearTimeout(scrollTimeout); // 타이머 클리어
                } else if (scrollTop < lastScrollTop && 
                          (lastScrollTop - scrollTop) >= minScrollDistance && 
                          scrollTop > scrollThreshold) {
                    // 스크롤 업 - 카운터 증가 (최소 거리 이상 스크롤해야 카운트)
                    scrollUpCount++;
                    
                    if (scrollUpCount >= 2) {
                        // 2번 이상 스크롤업 시에만 navbar 보이기
                        navbar.classList.add('scroll-up');
                        navbar.classList.remove('scroll-down');
                    }
                    
                    // 일정 시간 후 카운터 자동 리셋
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        scrollUpCount = 0;
                    }, 2000); // 2초 후 카운터 리셋
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
    
    console.log('Navbar 스크롤 기능이 초기화되었습니다. (2번 스크롤업 필요)');
}

// Hero 캐러셀 기능 초기화
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    if (totalSlides === 0) {
        console.log('Hero 배경 슬라이드를 찾을 수 없습니다.');
        return;
    }
    
    // 3초 간격으로 슬라이드 전환
    setInterval(function() {
        // 현재 슬라이드에서 active 클래스 제거
        slides[currentSlide].classList.remove('active');
        
        // 다음 슬라이드로 이동
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // 새로운 슬라이드에 active 클래스 추가
        slides[currentSlide].classList.add('active');
        
        console.log(`Hero 슬라이드 전환: ${currentSlide + 1}/${totalSlides}`);
    }, 3000); // 3초 간격
    
    console.log('Hero 캐러셀 기능이 초기화되었습니다.');
}

// Brand Story Section 01 초기화 함수
function initBrandStorySection01() {
    const section = document.querySelector('.brand-story-section-01');
    const container = document.querySelector('.brand-story-01-container');
    const imageList = document.querySelector('.brand-story-01-image-list');
    const scrollContainer = document.querySelector('.brand-story-01-scroll-container');
    
    if (!section || !container || !imageList || !scrollContainer) {
        console.log('Brand Story Section 01 요소를 찾을 수 없습니다.');
        return;
    }
    
    let isScrolling = false;
    let scrollProgress = 0;
    let maxScroll = 0;
    
    // 스크롤 가능한 최대 거리 계산
    function calculateMaxScroll() {
        const containerWidth = scrollContainer.offsetWidth;
        const listWidth = imageList.scrollWidth;
        maxScroll = listWidth - containerWidth;
    }
    
    
    // 초기 계산
    calculateMaxScroll();
    
    // 윈도우 리사이즈 시 재계산
    window.addEventListener('resize', calculateMaxScroll);
    
    // 스크롤 이벤트 처리
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const containerTop = container.offsetTop;
                const containerHeight = container.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // hero-section의 높이 계산 (100vh 또는 1080px 중 큰 값)
                const heroSection = document.querySelector('.hero-section');
                const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
                
                // hero-section이 뷰포트에서 완전히 사라진 후 sticky 시작
                const stickyStartPoint = heroBottom;
                
                // 횡스크롤 진행 가능한 범위 계산 (전체 범위는 windowHeight이지만, 가로스크롤은 일정 구간부터 시작)
                const scrollRange = windowHeight;
                const stickyEndPoint = stickyStartPoint + scrollRange;
                
                // 가로 스크롤이 실제로 시작되는 지점 (sticky 시작 후 일정 거리 이상 스크롤)
                const horizontalScrollStartOffset = scrollRange * 0.2; // scrollRange의 20% 스크롤 후 가로스크롤 시작
                const horizontalScrollStartPoint = stickyStartPoint + horizontalScrollStartOffset;
                
                // 스티키 적용 여부 확인
                const shouldBeSticky = scrollTop >= stickyStartPoint && 
                                      scrollTop <= stickyEndPoint;
                
                if (shouldBeSticky) {
                    // brand-story-01-container에 sticky 적용
                    container.classList.add('sticky');
                    
                    // 가로 스크롤 시작 지점까지의 거리 계산
                    const distanceToHorizontalStart = scrollTop - horizontalScrollStartPoint;
                    
                    if (distanceToHorizontalStart > 0) {
                        // horizontalScrollStartPoint를 넘어서야 가로스크롤 시작
                        // 남은 스크롤 범위 내에서 진행률 계산
                        const remainingScrollRange = scrollRange - horizontalScrollStartOffset;
                        const horizontalScrollProgress = Math.min(1, distanceToHorizontalStart / remainingScrollRange);
                        
                        // 가로 스크롤 적용
                        scrollProgress = horizontalScrollProgress * maxScroll;
                        imageList.style.transform = `translateX(-${scrollProgress}px)`;
                        
                        console.log(`Sticky 상태, 횡스크롤 진행률: ${(horizontalScrollProgress * 100).toFixed(1)}%`);
                    } else {
                        // 아직 가로스크롤 시작 전
                        scrollProgress = 0;
                        imageList.style.transform = `translateX(0)`;
                        console.log(`Sticky 상태, 횡스크롤 시작 전 (${distanceToHorizontalStart.toFixed(0)}px 남음)`);
                    }
                } else {
                    // sticky 상태가 아님 (시작 전 또는 종료 후)
                    // sticky 클래스 제거
                    if (container.classList.contains('sticky')) {
                        container.classList.remove('sticky');
                        // 드래그 상태도 강제로 해제
                        isDragging = false;
                    }
                    // 가로스크롤 완전히 초기화
                    scrollProgress = 0;
                    imageList.style.transform = `translateX(0)`;
                }
                
                isScrolling = false;
            });
        }
        isScrolling = true;
    }
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    
    // 터치/마우스 드래그 지원 (모바일 및 데스크톱)
    let isDragging = false;
    let startX = 0;
    let startScrollProgress = 0;
    
    // 마우스 이벤트 (sticky 상태일 때만 작동)
    scrollContainer.addEventListener('mousedown', function(e) {
        if (!container.classList.contains('sticky')) return; // sticky 상태가 아니면 무시
        
        isDragging = true;
        startX = e.clientX;
        startScrollProgress = scrollProgress;
        scrollContainer.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // sticky 상태가 아니면 드래그 중단
        if (!container.classList.contains('sticky')) {
            isDragging = false;
            scrollContainer.style.cursor = 'grab';
            return;
        }
        
        const deltaX = e.clientX - startX;
        const newScrollProgress = Math.max(0, Math.min(maxScroll, startScrollProgress - deltaX));
        
        // 드래그 시 즉시 반응하되 부드러운 전환 적용
        scrollProgress = newScrollProgress;
        imageList.style.transform = `translateX(-${scrollProgress}px)`;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });
    
    // 터치 이벤트 (모바일, sticky 상태일 때만 작동)
    scrollContainer.addEventListener('touchstart', function(e) {
        if (!container.classList.contains('sticky')) return; // sticky 상태가 아니면 무시
        
        isDragging = true;
        startX = e.touches[0].clientX;
        startScrollProgress = scrollProgress;
        e.preventDefault();
    });
    
    scrollContainer.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        // sticky 상태가 아니면 터치 중단
        if (!container.classList.contains('sticky')) {
            isDragging = false;
            return;
        }
        
        const deltaX = e.touches[0].clientX - startX;
        const newScrollProgress = Math.max(0, Math.min(maxScroll, startScrollProgress - deltaX));
        
        // 터치 시 즉시 반응하되 부드러운 전환 적용
        scrollProgress = newScrollProgress;
        imageList.style.transform = `translateX(-${scrollProgress}px)`;
        e.preventDefault();
    });
    
    scrollContainer.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // 휠 이벤트 (가로 스크롤) - 횡스크롤 끝나면 세로 스크롤로 전환
    scrollContainer.addEventListener('wheel', function(e) {
        if (container.classList.contains('sticky')) {
            const deltaX = e.deltaX || e.deltaY;
            
            // 횡스크롤이 끝났는지 확인
            const isAtStart = scrollProgress <= 0;
            const isAtEnd = scrollProgress >= maxScroll;
            const isScrollingRight = deltaX > 0;
            const isScrollingLeft = deltaX < 0;
            
            // 횡스크롤이 끝났을 때는 페이지 스크롤 허용
            if ((isAtStart && isScrollingLeft) || (isAtEnd && isScrollingRight)) {
                // 페이지 스크롤 허용 (preventDefault 하지 않음)
                return;
            }
            
            // 횡스크롤이 가능한 경우에만 preventDefault
            e.preventDefault();
            
            // 더 느린 스크롤 속도로 조절 (현재의 60%)
            const scrollSpeed = 0.36;
            const newScrollProgress = Math.max(0, Math.min(maxScroll, scrollProgress + deltaX * scrollSpeed));
            
            scrollProgress = newScrollProgress;
            imageList.style.transform = `translateX(-${scrollProgress}px)`;
            
            // 횡스크롤이 끝에 도달했을 때 자동으로 세로 스크롤로 전환
            if (scrollProgress >= maxScroll) {
                // 다음 스크롤 이벤트에서 세로 스크롤 허용
                setTimeout(() => {
                    container.classList.remove('sticky');
                }, 100);
            }
        }
    });
    
    // 커서 스타일 설정
    scrollContainer.style.cursor = 'grab';
    
    console.log('Brand Story Section 01 기능이 초기화되었습니다.');
}

// Benefit Section 초기화 함수
function initBenefitSection() {
    const section = document.querySelector('.benefit-section');
    const items = document.querySelectorAll('.benefit-item');
    const images = document.querySelectorAll('.benefit-image');
    
    if (!section || items.length === 0 || images.length === 0) {
        console.log('Benefit Section 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 첫 번째 항목 활성화
    items[0].classList.add('active');
    images[0].classList.add('active');
    
    let isScrolling = false;
    let currentIndex = 0;
    let lastScrollTop = 0;
    
    // navbar 요소 가져오기
    const navbar = document.querySelector('.navbar');
    
    // sticky 시작 지점 계산 (부모 wrapper 기준)
    const wrapper = section.parentElement; // benefit-section-wrapper
    const stickyStartPoint = wrapper.offsetTop - window.innerHeight;
    // wrapper 높이의 4.5배 중 3.5배만큼 롤링 진행 (100vh * 3.5 = 350vh)
    // 첫 번째 항목을 더 오래 보이기 위해 범위 확장
    const scrollRange = window.innerHeight * 3.5;
    
    // 스크롤 이벤트 처리
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // 섹션이 sticky 상태에 들어갔는지 확인
                const isSticky = scrollTop >= stickyStartPoint && 
                                scrollTop <= stickyStartPoint + scrollRange;
                
                // navbar 스크롤 방향 감지 (benefit 섹션 sticky 상태에서만)
                if (navbar) {
                    if (isSticky) {
                        // benefit 섹션이 sticky 상태일 때
                        if (scrollTop > lastScrollTop && scrollTop > stickyStartPoint) {
                            // 스크롤 다운 - navbar 숨기기
                            navbar.classList.add('scroll-down');
                            navbar.classList.remove('scroll-up');
                        } else if (scrollTop < lastScrollTop) {
                            // 스크롤 업 - navbar 숨기기 (benefit 섹션에서만)
                            navbar.classList.add('scroll-down');
                            navbar.classList.remove('scroll-up');
                        }
                    }
                }
                lastScrollTop = scrollTop;
                
                if (isSticky) {
                    // sticky 상태에서의 스크롤 진행률 계산
                    const relativeScroll = scrollTop - stickyStartPoint;
                    
                    // sticky 진입 시점을 기준으로 추가 스크롤 계산
                    // relativeScroll이 0보다 클 때만 항목 변경 시작
                    let adjustedProgress;
                    
                    if (relativeScroll <= 0) {
                        // sticky가 방금 시작되었을 때 (relativeScroll이 0 이하)
                        // 첫 번째 항목 유지
                        adjustedProgress = 0;
                    } else if (relativeScroll <= scrollRange * 0.5) {
                        // sticky 진입 후 0~50% 구간: 첫 번째 항목 유지
                        // 스크롤업 시 첫 번째 항목을 더 오래 볼 수 있도록 구간 확장
                        adjustedProgress = 0;
                    } else if (relativeScroll <= scrollRange * 0.75) {
                        // 50~75% 구간: 두 번째 항목
                        adjustedProgress = 0.5;
                    } else {
                        // 75~100% 구간: 세 번째 항목
                        adjustedProgress = 1;
                    }
                    
                    // 진행률에 따라 활성 항목 결정
                    let newIndex = Math.floor(adjustedProgress * (items.length - 1));
                    newIndex = Math.min(newIndex, items.length - 1);
                    
                    // 활성 항목 변경
                    if (newIndex !== currentIndex) {
                        // 이전 항목 비활성화
                        items[currentIndex].classList.remove('active');
                        images[currentIndex].classList.remove('active');
                        
                        // 새 항목 활성화
                        currentIndex = newIndex;
                        items[currentIndex].classList.add('active');
                        images[currentIndex].classList.add('active');
                        
                        console.log(`Benefit 항목 변경: ${currentIndex + 1}, 진행률: ${(relativeScroll / scrollRange * 100).toFixed(1)}%`);
                    }
                }
                
                isScrolling = false;
            });
        }
        isScrolling = true;
    }
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    
    console.log('Benefit Section 기능이 초기화되었습니다.');
}

// Back to Top 버튼 기능 초기화
function initBackToTop() {
    const backToTopButtons = document.querySelectorAll('[data-text-button="back-to-top"]');
    
    if (backToTopButtons.length === 0) {
        console.log('Back to Top 버튼을 찾을 수 없습니다.');
        return;
    }
    
    // 각 버튼에 클릭 이벤트 리스너 추가
    backToTopButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 페이지 최상단으로 부드럽게 스크롤
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            console.log('Back to Top 버튼이 클릭되었습니다.');
        });
    });
    
    console.log('Back to Top 버튼 기능이 초기화되었습니다.');
}
