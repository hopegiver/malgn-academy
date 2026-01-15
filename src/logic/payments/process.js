export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                method: '',
                period: 'all'
            },

            // 통계
            stats: {
                todayAmount: 2850000,
                monthAmount: 45600000,
                unpaidAmount: 3200000,
                count: 124
            },

            // 수납 목록
            payments: [
                {
                    id: 1,
                    date: '2024-12-20',
                    studentId: 1,
                    studentName: '김철수',
                    grade: '고1',
                    item: '수강료 (고등수학 심화반)',
                    amount: 350000,
                    method: 'card',
                    processor: '홍길동',
                    memo: ''
                },
                {
                    id: 2,
                    date: '2024-12-20',
                    studentId: 2,
                    studentName: '이영희',
                    grade: '중2',
                    item: '수강료 (중등영어 기초반)',
                    amount: 280000,
                    method: 'transfer',
                    processor: '홍길동',
                    memo: ''
                },
                {
                    id: 3,
                    date: '2024-12-19',
                    studentId: 3,
                    studentName: '박민수',
                    grade: '고3',
                    item: '수강료 (고등물리 심화반)',
                    amount: 400000,
                    method: 'cash',
                    processor: '김선생',
                    memo: ''
                },
                {
                    id: 4,
                    date: '2024-12-19',
                    studentId: 4,
                    studentName: '최지훈',
                    grade: '중1',
                    item: '교재비',
                    amount: 45000,
                    method: 'card',
                    processor: '홍길동',
                    memo: ''
                },
                {
                    id: 5,
                    date: '2024-12-18',
                    studentId: 5,
                    studentName: '정수진',
                    grade: '고2',
                    item: '수강료 (고등수학 심화반)',
                    amount: 350000,
                    method: 'transfer',
                    processor: '김선생',
                    memo: ''
                }
            ],

            // 모달
            showModal: false,
            modalData: {
                studentId: '',
                item: '',
                amount: '',
                method: '',
                date: '',
                memo: ''
            }
        };
    },

    computed: {
        // 필터링된 수납 목록
        filteredPayments() {
            let filtered = this.payments;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(payment =>
                    payment.studentName.toLowerCase().includes(keyword)
                );
            }

            // 결제수단 필터
            if (this.filters.method) {
                filtered = filtered.filter(payment => payment.method === this.filters.method);
            }

            // 기간 필터
            if (this.filters.period !== 'all') {
                const today = new Date();
                filtered = filtered.filter(payment => {
                    const paymentDate = new Date(payment.date);

                    switch (this.filters.period) {
                        case 'today':
                            return paymentDate.toDateString() === today.toDateString();
                        case 'week':
                            const weekAgo = new Date(today);
                            weekAgo.setDate(today.getDate() - 7);
                            return paymentDate >= weekAgo;
                        case 'month':
                            return paymentDate.getMonth() === today.getMonth() &&
                                   paymentDate.getFullYear() === today.getFullYear();
                        default:
                            return true;
                    }
                });
            }

            // 날짜순 정렬 (최신순)
            return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    },

    mounted() {
        // 수납 목록 로드
        this.loadPayments();
    },

    methods: {
        // 수납 목록 로드
        async loadPayments() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/payments');
            // this.payments = response.data;

            console.log('수납 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 수납 등록 모달 표시
        showPaymentModal() {
            this.modalData = {
                studentId: '',
                item: '',
                amount: '',
                method: '',
                date: new Date().toISOString().split('T')[0],
                memo: ''
            };
            this.showModal = true;
        },

        // 학생 정보 로드
        loadStudentInfo() {
            // 학생 선택 시 미수납 내역 등을 조회하여 표시할 수 있음
            if (this.modalData.studentId) {
                console.log('학생 정보 로드:', this.modalData.studentId);
            }
        },

        // 영수증 출력
        printReceipt(payment) {
            // 영수증 출력 기능
            alert(`영수증 출력\n\n학생: ${payment.studentName}\n항목: ${payment.item}\n금액: ${this.formatCurrency(payment.amount)}원\n결제수단: ${this.getMethodText(payment.method)}`);
        },

        // 모달 닫기
        closeModal() {
            this.showModal = false;
            this.modalData = {
                studentId: '',
                item: '',
                amount: '',
                method: '',
                date: '',
                memo: ''
            };
        },

        // 폼 제출
        async handleSubmit() {
            try {
                // 실제로는 API 호출
                // const response = await this.$api.post('/api/payments', this.modalData);

                // 목록에 추가
                const newPayment = {
                    id: Date.now(),
                    ...this.modalData,
                    studentName: this.getStudentName(this.modalData.studentId),
                    grade: this.getStudentGrade(this.modalData.studentId),
                    item: this.getItemText(this.modalData.item),
                    processor: '홍길동' // 현재 로그인한 사용자
                };
                this.payments.unshift(newPayment);

                // 통계 업데이트
                this.stats.todayAmount += parseInt(this.modalData.amount);
                this.stats.monthAmount += parseInt(this.modalData.amount);
                this.stats.count++;

                alert('수납이 등록되었습니다.');
                console.log('수납 등록:', this.modalData);
                this.closeModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 학생명 가져오기
        getStudentName(studentId) {
            const students = {
                '1': '김철수',
                '2': '이영희',
                '3': '박민수',
                '4': '최지훈',
                '5': '정수진'
            };
            return students[studentId] || '알 수 없음';
        },

        // 학생 학년 가져오기
        getStudentGrade(studentId) {
            const grades = {
                '1': '고1',
                '2': '중2',
                '3': '고3',
                '4': '중1',
                '5': '고2'
            };
            return grades[studentId] || '';
        },

        // 항목 텍스트 변환
        getItemText(item) {
            const items = {
                tuition: '수강료',
                book: '교재비',
                exam: '시험비',
                etc: '기타'
            };
            return items[item] || item;
        },

        // 결제수단 텍스트 반환
        getMethodText(method) {
            const methodMap = {
                card: '카드',
                cash: '현금',
                transfer: '계좌이체'
            };
            return methodMap[method] || method;
        },

        // 결제수단 배지 클래스 반환
        getMethodBadgeClass(method) {
            const classMap = {
                card: 'bg-primary',
                cash: 'bg-success',
                transfer: 'bg-info'
            };
            return classMap[method] || 'bg-secondary';
        },

        // 금액 포맷팅
        formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR').format(amount);
        }
    }
};
