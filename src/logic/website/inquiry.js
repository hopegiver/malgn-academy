export default {
    data() {
        return {
            searchKeyword: '',
            filters: {
                type: '',
                status: ''
            },
            inquiries: [
                {
                    id: 15,
                    type: 'course',
                    name: '김민지',
                    phone: '010-1234-5678',
                    email: 'minji.kim@email.com',
                    content: '중학교 2학년 수학 수업 시간표와 수강료가 궁금합니다. 주 2회 수업이 가능한가요?',
                    status: 'pending',
                    createdAt: '2026-01-15 14:30',
                    answer: null,
                    answeredAt: null
                },
                {
                    id: 14,
                    type: 'schedule',
                    name: '이서준',
                    phone: '010-2345-6789',
                    email: 'seojun.lee@email.com',
                    content: '주말 수업도 가능한가요? 평일은 학교 일정이 바빠서 주말에만 수업을 듣고 싶습니다.',
                    status: 'pending',
                    createdAt: '2026-01-14 16:20',
                    answer: null,
                    answeredAt: null
                },
                {
                    id: 13,
                    type: 'tuition',
                    name: '박지우',
                    phone: '010-3456-7890',
                    email: 'jiwoo.park@email.com',
                    content: '고등학교 1학년 국영수 종합반 수강료와 할인 정책이 궁금합니다.',
                    status: 'answered',
                    createdAt: '2026-01-13 10:15',
                    answer: '안녕하세요. 고1 국영수 종합반은 월 45만원이며, 3개월 이상 등록시 10% 할인이 적용됩니다. 자세한 상담은 전화 주시면 감사하겠습니다.',
                    answeredAt: '2026-01-13 15:30'
                },
                {
                    id: 12,
                    type: 'course',
                    name: '최서연',
                    phone: '010-4567-8901',
                    email: 'seoyeon.choi@email.com',
                    content: '영어 회화 수업이 있나요? 초등학교 5학년 학생입니다.',
                    status: 'answered',
                    createdAt: '2026-01-12 13:45',
                    answer: '네, 초등 영어 회화반이 개설되어 있습니다. 레벨테스트 후 반 배정이 가능하며, 월수금 오후 4시 수업이 있습니다.',
                    answeredAt: '2026-01-12 17:20'
                },
                {
                    id: 11,
                    type: 'etc',
                    name: '정우진',
                    phone: '010-5678-9012',
                    email: 'woojin.jung@email.com',
                    content: '학원 방문 상담을 하고 싶은데 예약이 필요한가요?',
                    status: 'answered',
                    createdAt: '2026-01-11 11:20',
                    answer: '방문 상담은 평일 오전 10시~오후 6시에 가능하며, 사전 예약을 해주시면 더 상세한 상담이 가능합니다. 전화로 예약 부탁드립니다.',
                    answeredAt: '2026-01-11 14:10'
                },
                {
                    id: 10,
                    type: 'schedule',
                    name: '강민서',
                    phone: '010-6789-0123',
                    email: 'minseo.kang@email.com',
                    content: '여름방학 특강 일정이 언제부터인가요?',
                    status: 'pending',
                    createdAt: '2026-01-10 09:30',
                    answer: null,
                    answeredAt: null
                },
                {
                    id: 9,
                    type: 'tuition',
                    name: '윤서아',
                    phone: '010-7890-1234',
                    email: 'seoa.yoon@email.com',
                    content: '형제 할인이 있나요? 두 자녀를 모두 등록하려고 합니다.',
                    status: 'answered',
                    createdAt: '2026-01-09 15:50',
                    answer: '형제 할인은 15%가 적용되며, 둘째 자녀부터 할인이 적용됩니다. 자세한 내용은 방문 상담 시 안내해드리겠습니다.',
                    answeredAt: '2026-01-09 18:30'
                },
                {
                    id: 8,
                    type: 'course',
                    name: '임준호',
                    phone: '010-8901-2345',
                    email: 'junho.lim@email.com',
                    content: '중3 과학 수업은 실험 수업도 포함되나요?',
                    status: 'answered',
                    createdAt: '2026-01-08 12:10',
                    answer: '네, 중3 과학반은 월 2회 실험 수업이 포함되어 있으며, 내신 대비 이론 수업과 병행됩니다.',
                    answeredAt: '2026-01-08 16:45'
                }
            ],
            selectedInquiry: null,
            answerForm: {
                content: '',
                sendEmail: true
            }
        };
    },

    computed: {
        stats() {
            return {
                total: this.inquiries.length,
                pending: this.inquiries.filter(i => i.status === 'pending').length,
                answered: this.inquiries.filter(i => i.status === 'answered').length,
                thisWeek: this.inquiries.filter(i => {
                    const date = new Date(i.createdAt);
                    const today = new Date();
                    const weekAgo = new Date(today.setDate(today.getDate() - 7));
                    return date >= weekAgo;
                }).length
            };
        },

        filteredInquiries() {
            let result = this.inquiries;

            // 검색
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                result = result.filter(inquiry =>
                    inquiry.name.toLowerCase().includes(keyword) ||
                    inquiry.email.toLowerCase().includes(keyword) ||
                    inquiry.content.toLowerCase().includes(keyword)
                );
            }

            // 유형 필터
            if (this.filters.type) {
                result = result.filter(inquiry => inquiry.type === this.filters.type);
            }

            // 상태 필터
            if (this.filters.status) {
                result = result.filter(inquiry => inquiry.status === this.filters.status);
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

        getTypeText(type) {
            const types = {
                'course': '수강 문의',
                'schedule': '시간표 문의',
                'tuition': '수강료 문의',
                'etc': '기타 문의'
            };
            return types[type] || type;
        },

        getStatusText(status) {
            const statuses = {
                'pending': '미답변',
                'answered': '답변완료'
            };
            return statuses[status] || status;
        },

        getStatusBadgeClass(status) {
            const classes = {
                'pending': 'bg-warning',
                'answered': 'bg-success'
            };
            return classes[status] || 'bg-secondary';
        },

        viewInquiry(inquiry) {
            this.selectedInquiry = inquiry;
            const modal = new bootstrap.Modal(document.getElementById('detailModal'));
            modal.show();
        },

        showAnswerModal(inquiry) {
            if (inquiry) {
                this.selectedInquiry = inquiry;
            } else {
                this.selectedInquiry = null;
            }

            // 폼 초기화
            this.answerForm = {
                content: '',
                sendEmail: true
            };

            // 상세 모달 닫기
            const detailModal = bootstrap.Modal.getInstance(document.getElementById('detailModal'));
            if (detailModal) {
                detailModal.hide();
            }

            // 답변 모달 열기
            const modal = new bootstrap.Modal(document.getElementById('answerModal'));
            modal.show();
        },

        submitAnswer() {
            if (!this.answerForm.content.trim()) {
                alert('답변 내용을 입력해주세요.');
                return;
            }

            if (this.selectedInquiry) {
                // 선택된 문의에 답변 등록
                this.selectedInquiry.status = 'answered';
                this.selectedInquiry.answer = this.answerForm.content;
                this.selectedInquiry.answeredAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
            }

            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('answerModal'));
            modal.hide();

            // 성공 메시지
            if (this.answerForm.sendEmail) {
                alert('답변이 등록되었으며, 이메일이 발송되었습니다.');
            } else {
                alert('답변이 등록되었습니다.');
            }

            // 폼 초기화
            this.answerForm = {
                content: '',
                sendEmail: true
            };
            this.selectedInquiry = null;
        }
    },

    mounted() {
        console.log('문의 관리 페이지 로드됨');
    }
};
