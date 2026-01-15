export default {
    data() {
        return {
            searchKeyword: '',
            filters: {
                category: '',
                important: ''
            },
            notices: [
                {
                    id: 18,
                    category: 'schedule',
                    title: '신학기 시간표 안내',
                    content: '2026학년도 신학기 시간표를 안내드립니다.\n\n[초등부]\n- 월/수/금: 오후 4시~6시\n- 화/목: 오후 3시~5시\n\n[중등부]\n- 월/수/금: 오후 6시~9시\n- 화/목: 오후 7시~10시\n\n[고등부]\n- 월~금: 오후 7시~10시\n- 토: 오전 9시~오후 6시\n\n자세한 사항은 학원으로 문의 부탁드립니다.',
                    author: '관리자',
                    createdAt: '2026-01-15',
                    views: 248,
                    important: true,
                    pinned: true
                },
                {
                    id: 17,
                    category: 'payment',
                    title: '1월 수강료 납부 안내',
                    content: '1월 수강료 납부 안내드립니다.\n\n납부 기한: 1월 20일까지\n납부 방법: 계좌이체 또는 카드결제\n\n기한 내 미납 시 수업 참여가 제한될 수 있으니 양해 부탁드립니다.',
                    author: '관리자',
                    createdAt: '2026-01-14',
                    views: 312,
                    important: true,
                    pinned: true
                },
                {
                    id: 16,
                    category: 'event',
                    title: '겨울방학 특강 모집',
                    content: '겨울방학 특강 수강생을 모집합니다.\n\n[모집 과목]\n- 수학 심화반\n- 영어 문법반\n- 국어 독해반\n\n신청 기한: 1월 20일까지\n신청 방법: 학원 방문 또는 전화 신청\n\n많은 관심 부탁드립니다.',
                    author: '원장',
                    createdAt: '2026-01-13',
                    views: 185,
                    important: false,
                    pinned: false
                },
                {
                    id: 15,
                    category: 'general',
                    title: '설 연휴 휴무 안내',
                    content: '설 연휴 기간 학원 휴무를 안내드립니다.\n\n휴무 기간: 1월 28일 ~ 2월 2일\n정상 운영: 2월 3일부터\n\n휴무 기간 중 문의사항은 이메일로 부탁드립니다.',
                    author: '관리자',
                    createdAt: '2026-01-12',
                    views: 421,
                    important: true,
                    pinned: false
                },
                {
                    id: 14,
                    category: 'schedule',
                    title: '모의고사 일정 안내',
                    content: '1월 모의고사 일정을 안내드립니다.\n\n일시: 1월 18일(토) 오전 9시\n대상: 고등부 전체\n장소: 본관 3층\n\n시간 엄수 부탁드리며, 준비물은 수험표와 필기구입니다.',
                    author: '교무팀',
                    createdAt: '2026-01-11',
                    views: 156,
                    important: false,
                    pinned: false
                },
                {
                    id: 13,
                    category: 'event',
                    title: '학부모 상담 주간 안내',
                    content: '학부모 상담 주간을 운영합니다.\n\n기간: 1월 20일 ~ 1월 24일\n시간: 오전 10시 ~ 오후 5시\n방법: 개별 전화 연락 예정\n\n학생들의 학습 상황과 진로 상담이 진행될 예정입니다.',
                    author: '원장',
                    createdAt: '2026-01-10',
                    views: 203,
                    important: false,
                    pinned: false
                },
                {
                    id: 12,
                    category: 'general',
                    title: '신학기 교재 배부',
                    content: '신학기 교재 배부가 시작되었습니다.\n\n배부 기간: 1월 9일 ~ 1월 16일\n배부 장소: 1층 안내 데스크\n수령 시간: 수업 시간 30분 전\n\n교재 수령 후 이름을 꼭 기재해주세요.',
                    author: '교무팀',
                    createdAt: '2026-01-09',
                    views: 267,
                    important: false,
                    pinned: false
                },
                {
                    id: 11,
                    category: 'schedule',
                    title: '신학기 오리엔테이션',
                    content: '신학기 오리엔테이션을 개최합니다.\n\n일시: 1월 8일(수) 오후 2시\n대상: 신규 학생 및 학부모\n장소: 3층 강당\n\n학원 규정 및 수업 진행 방식에 대해 안내드립니다.',
                    author: '관리자',
                    createdAt: '2026-01-05',
                    views: 198,
                    important: false,
                    pinned: false
                }
            ],
            selectedNotice: null,
            noticeForm: {
                id: null,
                category: 'general',
                title: '',
                content: '',
                important: false,
                pinned: false,
                sendNotification: false
            }
        };
    },

    computed: {
        stats() {
            const today = new Date();
            const weekAgo = new Date(today.setDate(today.getDate() - 7));

            return {
                total: this.notices.length,
                important: this.notices.filter(n => n.important).length,
                thisWeek: this.notices.filter(n => {
                    const createdDate = new Date(n.createdAt);
                    return createdDate >= weekAgo;
                }).length,
                totalViews: this.notices.reduce((sum, n) => sum + n.views, 0)
            };
        },

        filteredNotices() {
            let result = this.notices;

            // 검색
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                result = result.filter(notice =>
                    notice.title.toLowerCase().includes(keyword) ||
                    notice.content.toLowerCase().includes(keyword)
                );
            }

            // 카테고리 필터
            if (this.filters.category) {
                result = result.filter(notice => notice.category === this.filters.category);
            }

            // 중요도 필터
            if (this.filters.important) {
                const isImportant = this.filters.important === 'true';
                result = result.filter(notice => notice.important === isImportant);
            }

            return result;
        }
    },

    methods: {
        handleSearch() {
            // 검색 처리 (computed에서 자동 처리됨)
        },

        handleFilter() {
            // 필터 처리 (computed에서 자동 처리됨)
        },

        getCategoryText(category) {
            const categories = {
                'general': '일반',
                'schedule': '수업',
                'event': '행사',
                'payment': '수강료'
            };
            return categories[category] || category;
        },

        viewNotice(notice) {
            this.selectedNotice = notice;
            // 조회수 증가
            notice.views++;
            const modal = new bootstrap.Modal(document.getElementById('detailModal'));
            modal.show();
        },

        showNoticeModal(notice) {
            if (notice) {
                // 수정 모드
                this.noticeForm = {
                    id: notice.id,
                    category: notice.category,
                    title: notice.title,
                    content: notice.content,
                    important: notice.important,
                    pinned: notice.pinned,
                    sendNotification: false
                };
            } else {
                // 등록 모드
                this.noticeForm = {
                    id: null,
                    category: 'general',
                    title: '',
                    content: '',
                    important: false,
                    pinned: false,
                    sendNotification: false
                };
            }

            // 상세 모달 닫기
            const detailModal = bootstrap.Modal.getInstance(document.getElementById('detailModal'));
            if (detailModal) {
                detailModal.hide();
            }

            const modal = new bootstrap.Modal(document.getElementById('noticeModal'));
            modal.show();
        },

        saveNotice() {
            if (!this.noticeForm.title.trim()) {
                alert('제목을 입력해주세요.');
                return;
            }

            if (!this.noticeForm.content.trim()) {
                alert('내용을 입력해주세요.');
                return;
            }

            if (this.noticeForm.id) {
                // 수정
                const index = this.notices.findIndex(n => n.id === this.noticeForm.id);
                if (index !== -1) {
                    this.notices[index] = {
                        ...this.notices[index],
                        category: this.noticeForm.category,
                        title: this.noticeForm.title,
                        content: this.noticeForm.content,
                        important: this.noticeForm.important,
                        pinned: this.noticeForm.pinned
                    };
                }
                alert('공지사항이 수정되었습니다.');
            } else {
                // 등록
                const newNotice = {
                    id: this.notices.length + 1,
                    category: this.noticeForm.category,
                    title: this.noticeForm.title,
                    content: this.noticeForm.content,
                    author: '관리자',
                    createdAt: new Date().toISOString().slice(0, 10),
                    views: 0,
                    important: this.noticeForm.important,
                    pinned: this.noticeForm.pinned
                };
                this.notices.unshift(newNotice);

                if (this.noticeForm.sendNotification) {
                    alert('공지사항이 등록되었으며, 알림이 발송되었습니다.');
                } else {
                    alert('공지사항이 등록되었습니다.');
                }
            }

            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('noticeModal'));
            modal.hide();
        },

        deleteNotice(notice) {
            if (confirm(`'${notice.title}' 공지를 삭제하시겠습니까?`)) {
                const index = this.notices.findIndex(n => n.id === notice.id);
                if (index !== -1) {
                    this.notices.splice(index, 1);
                    alert('공지사항이 삭제되었습니다.');
                }
            }
        }
    },

    mounted() {
        console.log('공지사항 페이지 로드됨');
    }
};
