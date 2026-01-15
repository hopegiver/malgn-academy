export default {
    data() {
        return {
            searchQuery: '',
            menuResults: [],
            manualResults: [],
            aiSuggestions: [],

            // 전체 메뉴 데이터 (default.js와 동일)
            allMenus: [
                {
                    section: '학생관리',
                    icon: 'bi-people-fill',
                    items: [
                        { label: '학생 목록', icon: 'bi-person-lines-fill', path: 'students/list' },
                        { label: '학생 등록', icon: 'bi-person-plus-fill', path: 'students/register' },
                        { label: '상담 관리', icon: 'bi-chat-left-text', path: 'students/counseling' }
                    ]
                },
                {
                    section: '수업관리',
                    icon: 'bi-journal-bookmark-fill',
                    items: [
                        { label: '수업 관리', icon: 'bi-journal-bookmark', path: 'classes/manage' },
                        { label: '수강 신청', icon: 'bi-person-add', path: 'classes/enrollment' },
                        { label: '시간표 관리', icon: 'bi-calendar-week', path: 'classes/schedule' }
                    ]
                },
                {
                    section: '수납관리',
                    icon: 'bi-wallet2',
                    items: [
                        { label: '수납 처리', icon: 'bi-credit-card', path: 'payments/process' },
                        { label: '수납 내역', icon: 'bi-list-check', path: 'payments/history' },
                        { label: '미수납 관리', icon: 'bi-exclamation-triangle', path: 'payments/unpaid' }
                    ]
                },
                {
                    section: '출결관리',
                    icon: 'bi-check-circle-fill',
                    items: [
                        { label: '출결 입력', icon: 'bi-check2-square', path: 'attendance/input' },
                        { label: '출결 현황', icon: 'bi-bar-chart', path: 'attendance/status' },
                        { label: '보강 관리', icon: 'bi-arrow-repeat', path: 'attendance/makeup' }
                    ]
                },
                {
                    section: '성적관리',
                    icon: 'bi-trophy-fill',
                    items: [
                        { label: '성적 입력', icon: 'bi-pencil-square', path: 'grades/input' },
                        { label: '성적 조회', icon: 'bi-graph-up', path: 'grades/view' },
                        { label: '성적표 발급', icon: 'bi-file-earmark-text', path: 'grades/report' }
                    ]
                },
                {
                    section: '온라인강의',
                    icon: 'bi-laptop-fill',
                    items: [
                        { label: '강의 관리', icon: 'bi-camera-video', path: 'online/lectures' },
                        { label: '수강 관리', icon: 'bi-play-circle', path: 'online/enrollment' },
                        { label: '학습 현황', icon: 'bi-clock-history', path: 'online/progress' }
                    ]
                },
                {
                    section: '홈페이지',
                    icon: 'bi-globe',
                    items: [
                        { label: '페이지 관리', icon: 'bi-file-earmark-richtext', path: 'website/pages' },
                        { label: '메뉴 관리', icon: 'bi-menu-button-wide', path: 'website/menus' },
                        { label: '게시판 관리', icon: 'bi-clipboard', path: 'website/board' },
                        { label: '문의 관리', icon: 'bi-question-circle', path: 'website/inquiry' }
                    ]
                },
                {
                    section: '소통관리',
                    icon: 'bi-chat-dots-fill',
                    items: [
                        { label: '메시지 발송', icon: 'bi-envelope', path: 'communication/message' },
                        { label: '학원알림', icon: 'bi-bell', path: 'communication/alert' },
                        { label: '공지사항', icon: 'bi-megaphone', path: 'communication/notice' }
                    ]
                },
                {
                    section: '통계/리포트',
                    icon: 'bi-graph-up-arrow',
                    items: [
                        { label: '운영 현황', icon: 'bi-pie-chart', path: 'reports/operation' },
                        { label: '매출 분석', icon: 'bi-cash-stack', path: 'reports/revenue' }
                    ]
                },
                {
                    section: '환경설정',
                    icon: 'bi-gear-fill',
                    items: [
                        { label: '학원 정보', icon: 'bi-building', path: 'settings/academy' },
                        { label: '직원 관리', icon: 'bi-person-badge', path: 'settings/staff' },
                        { label: '시스템 설정', icon: 'bi-gear', path: 'settings/system' }
                    ]
                }
            ]
        };
    },

    computed: {
        totalResults() {
            return this.menuResults.length + this.manualResults.length;
        }
    },

    mounted() {
        this.loadSearchQuery();
        // URL 변경 감지 (같은 페이지에서 쿼리만 바뀔 때)
        this._hashchangeHandler = () => {
            // 현재 페이지가 검색 결과 페이지일 때만 처리
            if (window.location.hash.startsWith('#/search/results')) {
                this.loadSearchQuery();
            }
        };
        window.addEventListener('hashchange', this._hashchangeHandler);
    },

    beforeUnmount() {
        if (this._hashchangeHandler) {
            window.removeEventListener('hashchange', this._hashchangeHandler);
        }
    },

    methods: {
        // URL에서 검색어 가져오기
        loadSearchQuery() {
            const hash = window.location.hash;
            const queryMatch = hash.match(/\?q=([^&]+)/);

            if (queryMatch) {
                this.searchQuery = decodeURIComponent(queryMatch[1]);
                this.performSearch();
            } else {
                // 검색어가 없으면 홈으로 리다이렉트
                window.location.hash = '#/home';
            }
        },

        performSearch() {
            if (!this.searchQuery.trim()) {
                return;
            }

            const query = this.searchQuery.toLowerCase().trim();
            this.menuResults = [];

            // 메뉴 검색
            this.allMenus.forEach(menuSection => {
                menuSection.items.forEach(item => {
                    if (item.label.toLowerCase().includes(query) ||
                        item.path.toLowerCase().includes(query)) {
                        this.menuResults.push({
                            label: item.label,
                            path: item.path,
                            icon: item.icon,
                            section: menuSection.section
                        });
                    }
                });
            });

            // TODO: 매뉴얼 검색 구현
            // this.searchManuals(query);

            // TODO: AI 도움말 생성
            // this.generateAISuggestions(query);
        },

        // 검색어 하이라이트
        highlightText(text) {
            if (!this.searchQuery) {
                return text;
            }

            const query = this.searchQuery.trim();
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark class="bg-warning bg-opacity-25 fw-semibold">$1</mark>');
        },

        // 매뉴얼 검색 (향후 구현)
        searchManuals(query) {
            // TODO: 매뉴얼 데이터베이스에서 검색
            this.manualResults = [];
        },

        // AI 도움말 생성 (향후 구현)
        generateAISuggestions(query) {
            // TODO: AI API 호출하여 도움말 생성
            this.aiSuggestions = [];
        }
    }
};
