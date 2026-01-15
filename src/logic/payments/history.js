export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                method: '',
                item: '',
                startDate: '',
                endDate: ''
            },

            // 통계
            stats: {
                totalAmount: 48750000,
                count: 128,
                cardAmount: 25600000,
                cashAmount: 12850000
            },

            // 수납 내역
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
                    memo: '현금영수증 발행'
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
                },
                {
                    id: 6,
                    date: '2024-12-18',
                    studentId: 6,
                    studentName: '강민지',
                    grade: '중3',
                    item: '수강료 (중등국어 중급반)',
                    amount: 320000,
                    method: 'card',
                    processor: '홍길동',
                    memo: ''
                },
                {
                    id: 7,
                    date: '2024-12-17',
                    studentId: 7,
                    studentName: '윤서현',
                    grade: '고2',
                    item: '교재비',
                    amount: 38000,
                    method: 'cash',
                    processor: '김선생',
                    memo: ''
                },
                {
                    id: 8,
                    date: '2024-12-17',
                    studentId: 8,
                    studentName: '장동현',
                    grade: '고3',
                    item: '모의고사비',
                    amount: 25000,
                    method: 'transfer',
                    processor: '홍길동',
                    memo: '12월 모의고사'
                },
                {
                    id: 9,
                    date: '2024-12-16',
                    studentId: 9,
                    studentName: '오지은',
                    grade: '중1',
                    item: '수강료 (중등영어 기초반)',
                    amount: 280000,
                    method: 'card',
                    processor: '김선생',
                    memo: ''
                },
                {
                    id: 10,
                    date: '2024-12-16',
                    studentId: 10,
                    studentName: '임준혁',
                    grade: '고1',
                    item: '수강료 (고등화학 심화반)',
                    amount: 380000,
                    method: 'cash',
                    processor: '홍길동',
                    memo: '현금영수증 발행'
                }
            ],

            // 수정 모달
            showEditModal: false,
            editData: {
                id: null,
                studentName: '',
                item: '',
                amount: '',
                method: '',
                date: '',
                memo: ''
            }
        };
    },

    computed: {
        // 필터링된 수납 내역
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

            // 항목 필터
            if (this.filters.item) {
                filtered = filtered.filter(payment => {
                    return payment.item.includes(this.getItemText(this.filters.item));
                });
            }

            // 날짜 필터
            if (this.filters.startDate) {
                filtered = filtered.filter(payment =>
                    new Date(payment.date) >= new Date(this.filters.startDate)
                );
            }
            if (this.filters.endDate) {
                filtered = filtered.filter(payment =>
                    new Date(payment.date) <= new Date(this.filters.endDate)
                );
            }

            // 날짜순 정렬 (최신순)
            return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    },

    mounted() {
        // 수납 내역 로드
        this.loadPayments();
    },

    methods: {
        // 수납 내역 로드
        async loadPayments() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/payments/history');
            // this.payments = response.data.payments;
            // this.stats = response.data.stats;

            console.log('수납 내역 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 초기화
        resetFilters() {
            this.searchKeyword = '';
            this.filters = {
                method: '',
                item: '',
                startDate: '',
                endDate: ''
            };
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 영수증 출력
        printReceipt(payment) {
            alert(`영수증 출력\n\n학생: ${payment.studentName}\n항목: ${payment.item}\n금액: ${this.formatCurrency(payment.amount)}원\n결제수단: ${this.getMethodText(payment.method)}`);
        },

        // 수납 내역 수정
        editPayment(payment) {
            this.editData = {
                id: payment.id,
                studentName: payment.studentName,
                item: payment.item,
                amount: payment.amount,
                method: payment.method,
                date: payment.date,
                memo: payment.memo || ''
            };
            this.showEditModal = true;
        },

        // 수납 내역 삭제
        async deletePayment(payment) {
            if (!confirm(`${payment.studentName} 학생의 수납 내역을 삭제하시겠습니까?\n\n※ 삭제된 내역은 복구할 수 없습니다.`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.delete(`/api/payments/${payment.id}`);

                // 목록에서 제거
                const index = this.payments.findIndex(p => p.id === payment.id);
                if (index > -1) {
                    this.payments.splice(index, 1);
                }

                // 통계 업데이트
                this.stats.totalAmount -= payment.amount;
                this.stats.count--;
                if (payment.method === 'card') {
                    this.stats.cardAmount -= payment.amount;
                } else if (payment.method === 'cash') {
                    this.stats.cashAmount -= payment.amount;
                }

                alert('수납 내역이 삭제되었습니다.');
                console.log('수납 내역 삭제:', payment.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 수정 모달 닫기
        closeEditModal() {
            this.showEditModal = false;
            this.editData = {
                id: null,
                studentName: '',
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
                // await this.$api.put(`/api/payments/${this.editData.id}`, this.editData);

                // 목록 업데이트
                const index = this.payments.findIndex(p => p.id === this.editData.id);
                if (index > -1) {
                    const oldAmount = this.payments[index].amount;
                    const oldMethod = this.payments[index].method;
                    const newAmount = parseInt(this.editData.amount);
                    const newMethod = this.editData.method;

                    this.payments[index] = {
                        ...this.payments[index],
                        item: this.editData.item,
                        amount: newAmount,
                        method: newMethod,
                        date: this.editData.date,
                        memo: this.editData.memo
                    };

                    // 통계 업데이트
                    this.stats.totalAmount = this.stats.totalAmount - oldAmount + newAmount;

                    // 결제수단별 통계 업데이트
                    if (oldMethod === 'card') {
                        this.stats.cardAmount -= oldAmount;
                    } else if (oldMethod === 'cash') {
                        this.stats.cashAmount -= oldAmount;
                    }

                    if (newMethod === 'card') {
                        this.stats.cardAmount += newAmount;
                    } else if (newMethod === 'cash') {
                        this.stats.cashAmount += newAmount;
                    }
                }

                alert('수납 내역이 수정되었습니다.');
                console.log('수납 내역 수정:', this.editData);
                this.closeEditModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 엑셀 다운로드
        exportExcel() {
            alert('엑셀 파일을 다운로드합니다.');
            console.log('엑셀 다운로드:', this.filteredPayments);
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
