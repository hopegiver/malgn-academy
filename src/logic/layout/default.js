export default {
    name: 'defaultLayout',

    data() {
        return {
            // 학원 정보
            academyName: '우리학원',

            // 사용자 정보
            userName: '홍길동',
            userRole: '원장',
            userInitial: '홍',

            // UI 상태
            sidebarCollapsed: false,
            sidebarOpen: window.innerWidth > 1024,  // 데스크톱에서만 기본으로 열림
            showNotifications: false,
            showMobileSearch: false,  // 모바일 검색창 표시 여부
            isMobile: window.innerWidth <= 768,
            isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
            isDesktop: window.innerWidth > 1024,
            searchQuery: '',
            sidebarIconMode: false,  // 아이콘 전용 사이드바 모드

            // 알림
            unreadCount: 5,
            notifications: [
                {
                    id: 1,
                    type: 'danger',
                    icon: 'bi-credit-card-2-front',
                    title: '미수납 알림',
                    message: '김철수 학생 11월 수강료 미납 (7일 경과)',
                    time: '5분 전',
                    read: false,
                    link: '/payments/unpaid'
                },
                {
                    id: 2,
                    type: 'primary',
                    icon: 'bi-calendar-check',
                    title: '상담 예약',
                    message: '이영희 학부모 상담 - 오늘 오후 3시',
                    time: '30분 전',
                    read: false,
                    link: '/students/counseling'
                },
                {
                    id: 3,
                    type: 'warning',
                    icon: 'bi-calendar-x',
                    title: '수강 만료 예정',
                    message: '박민수 학생 수강 3일 후 종료',
                    time: '1시간 전',
                    read: false,
                    link: '/students/list'
                },
                {
                    id: 4,
                    type: 'success',
                    icon: 'bi-cake2',
                    title: '생일 알림',
                    message: '최지훈 학생 생일입니다 🎂',
                    time: '2시간 전',
                    read: false,
                    link: '/students/list'
                },
                {
                    id: 5,
                    type: 'primary',
                    icon: 'bi-graph-up-arrow',
                    title: '목표 달성',
                    message: '이번 달 매출 목표 달성! (120%)',
                    time: '3시간 전',
                    read: false,
                    link: '/reports/revenue'
                }
            ],

            // 메뉴 구조 (현재 페이지에 따라 동적으로 변경)
            menuSections: [],

            // 전체 메뉴 정의
            allMenus: {
                home: [
                    {
                        title: '빠른 메뉴',
                        items: [
                            { label: '대시보드', icon: 'bi-house-door', path: 'home' }
                        ]
                    }
                ],
                students: [
                    {
                        title: '학생관리',
                        items: [
                            { label: '학생 목록', icon: 'bi-person-lines-fill', path: 'students/list' },
                            { label: '학생 등록', icon: 'bi-person-plus-fill', path: 'students/register' },
                            { label: '상담 관리', icon: 'bi-chat-left-text', path: 'students/counseling' }
                        ]
                    }
                ],
                classes: [
                    {
                        title: '수업관리',
                        items: [
                            { label: '수업 관리', icon: 'bi-journal-bookmark', path: 'classes/manage' },
                            { label: '수강 신청', icon: 'bi-person-add', path: 'classes/enrollment' },
                            { label: '시간표 관리', icon: 'bi-calendar-week', path: 'classes/schedule' }
                        ]
                    }
                ],
                payments: [
                    {
                        title: '수납관리',
                        items: [
                            { label: '수납 처리', icon: 'bi-credit-card', path: 'payments/process' },
                            { label: '수납 내역', icon: 'bi-list-check', path: 'payments/history' },
                            { label: '미수납 관리', icon: 'bi-exclamation-triangle', path: 'payments/unpaid' }
                        ]
                    }
                ],
                attendance: [
                    {
                        title: '출결관리',
                        items: [
                            { label: '출결 입력', icon: 'bi-check2-square', path: 'attendance/input' },
                            { label: '출결 현황', icon: 'bi-bar-chart', path: 'attendance/status' },
                            { label: '보강 관리', icon: 'bi-arrow-repeat', path: 'attendance/makeup' }
                        ]
                    }
                ],
                grades: [
                    {
                        title: '성적관리',
                        items: [
                            { label: '성적 입력', icon: 'bi-pencil-square', path: 'grades/input' },
                            { label: '성적 조회', icon: 'bi-graph-up', path: 'grades/view' },
                            { label: '성적표 발급', icon: 'bi-file-earmark-text', path: 'grades/report' }
                        ]
                    }
                ],
                staff: [
                    {
                        title: '직원관리',
                        items: [
                            { label: '직원 목록', icon: 'bi-people', path: 'staff/list' },
                            { label: '직원 등록', icon: 'bi-person-plus', path: 'staff/register' },
                            { label: '권한 관리', icon: 'bi-shield-check', path: 'staff/permissions' }
                        ]
                    }
                ],
                online: [
                    {
                        title: '온라인교육',
                        items: [
                            { label: '강의 관리', icon: 'bi-camera-video', path: 'online/lectures' },
                            { label: '수강 관리', icon: 'bi-play-circle', path: 'online/enrollment' },
                            { label: '학습 현황', icon: 'bi-clock-history', path: 'online/progress' }
                        ]
                    }
                ],
                website: [
                    {
                        title: '홈페이지',
                        items: [
                            { label: '페이지 관리', icon: 'bi-file-earmark-richtext', path: 'website/pages' },
                            { label: '메뉴 관리', icon: 'bi-menu-button-wide', path: 'website/menus' },
                            { label: '게시판 관리', icon: 'bi-clipboard', path: 'website/board' },
                            { label: '문의 관리', icon: 'bi-question-circle', path: 'website/inquiry' }
                        ]
                    }
                ],
                communication: [
                    {
                        title: '소통관리',
                        items: [
                            { label: '메시지 발송', icon: 'bi-envelope', path: 'communication/message' },
                            { label: '학원알림', icon: 'bi-bell', path: 'communication/alert' },
                            { label: '공지사항', icon: 'bi-megaphone', path: 'communication/notice' }
                        ]
                    }
                ],
                reports: [
                    {
                        title: '통계/리포트',
                        items: [
                            { label: '운영 현황', icon: 'bi-pie-chart', path: 'reports/operation' },
                            { label: '매출 분석', icon: 'bi-cash-stack', path: 'reports/revenue' }
                        ]
                    }
                ],
                settings: [
                    {
                        title: '환경설정',
                        items: [
                            { label: '학원 정보', icon: 'bi-building', path: 'settings/academy' },
                            { label: '사용자 관리', icon: 'bi-person-gear', path: 'settings/users' },
                            { label: '시스템 설정', icon: 'bi-gear', path: 'settings/system' }
                        ]
                    }
                ]
            }
        };
    },

    computed: {
        // 토글 아이콘 클래스 (PC/모바일 모두 항상 햄버거)
        toggleIconClass() {
            return 'bi-list';
        }
    },

    mounted() {
        // 디바이스 타입 초기화
        this.updateDeviceType();

        // 전체 메뉴 로드 및 현재 라우트에 맞는 메뉴 열기
        this.loadAllMenus();
        this.updateMenuState();

        // 라우트 변경 감지 시 메뉴 상태 업데이트
        window.addEventListener('hashchange', () => {
            this.updateMenuState();
        });

        // 알림 드롭다운 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-bell') && !e.target.closest('.notification-dropdown')) {
                this.showNotifications = false;
            }
        });

        // 플라이아웃 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (this.sidebarIconMode && !e.target.closest('.menu-section')) {
                this.menuSections.forEach(section => {
                    section.isOpen = false;
                });
            }
        });

        // 화면 크기 변경 감지
        window.addEventListener('resize', () => {
            this.updateDeviceType();
        });

        // 사용자 정보 로드 (실제로는 API 호출)
        this.loadUserInfo();
    },

    methods: {
        // 디바이스 타입 업데이트
        updateDeviceType() {
            const width = window.innerWidth;
            const wasMobile = this.isMobile;
            const wasTablet = this.isTablet;
            const wasDesktop = this.isDesktop;

            this.isMobile = width <= 768;
            this.isTablet = width > 768 && width <= 1024;
            this.isDesktop = width > 1024;

            // 디바이스 전환 시 사이드바 상태 조정
            if (this.isMobile) {
                // 모바일: 사이드바 닫기
                this.sidebarOpen = false;
                this.sidebarIconMode = false;
            } else if (this.isTablet) {
                // 태블릿: 아이콘 모드 활성화
                this.sidebarIconMode = true;
                this.sidebarOpen = true;
            } else if (this.isDesktop) {
                // 데스크톱: 전체 사이드바 열기
                this.sidebarIconMode = false;
                this.sidebarOpen = true;
            }
        },

        // 사이드바 토글
        toggleSidebar() {
            if (this.isMobile) {
                // 모바일: 사이드바 오버레이 열기/닫기
                this.sidebarOpen = !this.sidebarOpen;
            } else if (this.isTablet) {
                // 태블릿: 아이콘 모드 ↔ 전체 모드
                this.sidebarIconMode = !this.sidebarIconMode;
            } else {
                // 데스크톱: 사이드바 열기/닫기
                this.sidebarOpen = !this.sidebarOpen;
            }
        },

        // 알림 토글
        toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },

        // 알림 클릭 처리
        handleNotificationClick(notif) {
            notif.read = true;
            this.unreadCount = this.notifications.filter(n => !n.read).length;
            this.showNotifications = false;
            window.location.hash = '#' + notif.link;
        },

        // 모두 읽음 처리
        markAllAsRead() {
            this.notifications.forEach(n => n.read = true);
            this.unreadCount = 0;
        },

        // 검색 처리
        handleSearch() {
            if (!this.searchQuery.trim()) {
                return;
            }

            const query = encodeURIComponent(this.searchQuery.trim());
            window.location.hash = '#/search/results?q=' + query;
            this.searchQuery = '';
            this.showMobileSearch = false;  // 모바일 검색 후 닫기
        },

        // 모바일 검색 토글
        toggleMobileSearch() {
            this.showMobileSearch = !this.showMobileSearch;
        },

        // 로그아웃
        handleLogout() {
            if (confirm('로그아웃 하시겠습니까?')) {
                // 실제로는 API 호출 및 토큰 제거
                alert('로그아웃 되었습니다.');
                window.location.hash = '#/login';
            }
        },

        // 섹션 토글
        toggleSection(index, event) {
            // 아이콘 모드에서는 한 번에 하나만 열림
            if (this.sidebarIconMode) {
                // 다른 섹션 모두 닫기
                this.menuSections.forEach((section, idx) => {
                    if (idx !== index) {
                        section.isOpen = false;
                    }
                });

                // 플라이아웃 위치 계산 (클릭한 버튼의 위치)
                if (event && event.currentTarget) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const section = this.menuSections[index];

                    // 메뉴 높이 추정 (헤더 60px + 각 항목 48px)
                    const estimatedMenuHeight = 60 + (section.items.length * 48);
                    const viewportHeight = window.innerHeight;
                    const spaceBelow = viewportHeight - rect.top;

                    // 화면 아래 공간이 부족한 경우
                    if (spaceBelow < estimatedMenuHeight) {
                        // 화면 아래 여유 공간에 맞춰 max-height 설정
                        const maxHeight = spaceBelow - 20; // 20px 여유 공간
                        section.flyoutMaxHeight = maxHeight;
                        section.flyoutTop = rect.top;
                    } else {
                        // 공간이 충분하면 제한 없음
                        section.flyoutMaxHeight = null;
                        section.flyoutTop = rect.top;
                    }
                }
            }
            this.menuSections[index].isOpen = !this.menuSections[index].isOpen;
        },

        // 플라이아웃 닫기
        closeFlyout(index) {
            this.menuSections[index].isOpen = false;
        },

        // 전체 메뉴 로드
        loadAllMenus() {
            // 대시보드는 별도로 1depth에 표시, 나머지는 아코디언 (기본적으로 모두 닫힌 상태)
            this.menuSections = [
                // 학생관리
                {
                    title: '학생관리',
                    icon: 'bi-people-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'students',
                    items: [
                        { label: '학생 목록', icon: 'bi-person-lines-fill', path: 'students/list' },
                        { label: '학생 등록', icon: 'bi-person-plus-fill', path: 'students/register' },
                        { label: '상담 관리', icon: 'bi-chat-left-text', path: 'students/counseling' }
                    ]
                },
                // 수업관리
                {
                    title: '수업관리',
                    icon: 'bi-journal-bookmark-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'classes',
                    items: [
                        { label: '수업 관리', icon: 'bi-journal-bookmark', path: 'classes/manage' },
                        { label: '수강 신청', icon: 'bi-person-add', path: 'classes/enrollment' },
                        { label: '시간표 관리', icon: 'bi-calendar-week', path: 'classes/schedule' }
                    ]
                },
                // 수납관리
                {
                    title: '수납관리',
                    icon: 'bi-wallet2',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'payments',
                    items: [
                        { label: '수납 처리', icon: 'bi-credit-card', path: 'payments/process' },
                        { label: '수납 내역', icon: 'bi-list-check', path: 'payments/history' },
                        { label: '미수납 관리', icon: 'bi-exclamation-triangle', path: 'payments/unpaid' }
                    ]
                },
                // 출결관리
                {
                    title: '출결관리',
                    icon: 'bi-check-circle-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'attendance',
                    items: [
                        { label: '출결 입력', icon: 'bi-check2-square', path: 'attendance/input' },
                        { label: '출결 현황', icon: 'bi-bar-chart', path: 'attendance/status' },
                        { label: '보강 관리', icon: 'bi-arrow-repeat', path: 'attendance/makeup' }
                    ]
                },
                // 성적관리
                {
                    title: '성적관리',
                    icon: 'bi-trophy-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'grades',
                    items: [
                        { label: '성적 입력', icon: 'bi-pencil-square', path: 'grades/input' },
                        { label: '성적 조회', icon: 'bi-graph-up', path: 'grades/view' },
                        { label: '성적표 발급', icon: 'bi-file-earmark-text', path: 'grades/report' }
                    ]
                },
                // 온라인강의
                {
                    title: '온라인강의',
                    icon: 'bi-laptop-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'online',
                    items: [
                        { label: '강의 관리', icon: 'bi-camera-video', path: 'online/lectures' },
                        { label: '수강 관리', icon: 'bi-play-circle', path: 'online/enrollment' },
                        { label: '학습 현황', icon: 'bi-clock-history', path: 'online/progress' }
                    ]
                },
                // 홈페이지
                {
                    title: '홈페이지',
                    icon: 'bi-globe',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'website',
                    items: [
                        { label: '페이지 관리', icon: 'bi-file-earmark-richtext', path: 'website/pages' },
                        { label: '메뉴 관리', icon: 'bi-menu-button-wide', path: 'website/menus' },
                        { label: '게시판 관리', icon: 'bi-clipboard', path: 'website/board' },
                        { label: '문의 관리', icon: 'bi-question-circle', path: 'website/inquiry' }
                    ]
                },
                // 소통관리
                {
                    title: '소통관리',
                    icon: 'bi-chat-dots-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'communication',
                    items: [
                        { label: '메시지 발송', icon: 'bi-envelope', path: 'communication/message' },
                        { label: '학원알림', icon: 'bi-bell', path: 'communication/alert' },
                        { label: '공지사항', icon: 'bi-megaphone', path: 'communication/notice' }
                    ]
                },
                // 통계/리포트
                {
                    title: '통계/리포트',
                    icon: 'bi-graph-up-arrow',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'reports',
                    items: [
                        { label: '운영 현황', icon: 'bi-pie-chart', path: 'reports/operation' },
                        { label: '매출 분석', icon: 'bi-cash-stack', path: 'reports/revenue' }
                    ]
                },
                // 환경설정
                {
                    title: '환경설정',
                    icon: 'bi-gear-fill',
                    isOpen: false,
                    flyoutTop: 0,
                    flyoutMaxHeight: null,
                    path: 'settings',
                    items: [
                        { label: '학원 정보', icon: 'bi-building', path: 'settings/academy' },
                        { label: '직원 관리', icon: 'bi-person-badge', path: 'settings/staff' },
                        { label: '시스템 설정', icon: 'bi-gear', path: 'settings/system' }
                    ]
                }
            ];
        },

        // 메뉴 상태 업데이트 (현재 라우트에 따라 해당 메뉴만 열기)
        updateMenuState() {
            const currentPath = window.location.hash.replace('#/', '');
            const firstPath = currentPath.split('/')[0];

            // 모든 메뉴를 닫고
            this.menuSections.forEach(section => {
                section.isOpen = false;
            });

            // 현재 경로에 해당하는 메뉴만 열기
            const activeSection = this.menuSections.find(section => section.path === firstPath);
            if (activeSection) {
                activeSection.isOpen = true;
            }
        },

        // 활성 라우트 체크
        isActiveRoute(path) {
            const currentPath = window.location.hash.replace('#/', '');
            return currentPath === path || currentPath.startsWith(path + '/');
        },

        // 사용자 정보 로드
        loadUserInfo() {
            // 실제로는 API에서 가져옴
            // const response = await this.$api.get('/api/user/profile');
            // this.userName = response.data.name;
            // this.userRole = response.data.role;
            // this.academyName = response.data.academyName;

            // 이니셜 생성
            this.userInitial = this.userName.charAt(0);
        }
    }
};
