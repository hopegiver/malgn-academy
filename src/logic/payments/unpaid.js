export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                grade: '',
                period: '',
                item: ''
            },
            sortBy: 'amount',
            selectAll: false,

            // 통계
            stats: {
                unpaidStudents: 18,
                totalUnpaid: 5240000,
                longTermUnpaid: 4,
                reminders: 12
            },

            // 미수납 목록
            unpaidList: [
                {
                    id: 1,
                    studentId: 11,
                    studentName: '김민준',
                    grade: '고2',
                    item: '수강료 (고등수학 심화반)',
                    amount: 350000,
                    dueDate: '2024-11-15',
                    overdueDays: 35,
                    phone: '010-1234-5678',
                    lastReminderDate: '2024-12-10',
                    selected: false
                },
                {
                    id: 2,
                    studentId: 12,
                    studentName: '이서연',
                    grade: '중3',
                    item: '수강료 (중등영어 기초반)',
                    amount: 280000,
                    dueDate: '2024-11-20',
                    overdueDays: 30,
                    phone: '010-2345-6789',
                    lastReminderDate: '2024-12-05',
                    selected: false
                },
                {
                    id: 3,
                    studentId: 13,
                    studentName: '박지훈',
                    grade: '고1',
                    item: '수강료 (고등물리 심화반)',
                    amount: 400000,
                    dueDate: '2024-10-25',
                    overdueDays: 56,
                    phone: '010-3456-7890',
                    lastReminderDate: '2024-11-28',
                    selected: false
                },
                {
                    id: 4,
                    studentId: 14,
                    studentName: '최유진',
                    grade: '중2',
                    item: '교재비',
                    amount: 45000,
                    dueDate: '2024-12-01',
                    overdueDays: 19,
                    phone: '010-4567-8901',
                    lastReminderDate: '',
                    selected: false
                },
                {
                    id: 5,
                    studentId: 15,
                    studentName: '정하은',
                    grade: '고3',
                    item: '수강료 (고등화학 심화반)',
                    amount: 380000,
                    dueDate: '2024-11-10',
                    overdueDays: 40,
                    phone: '010-5678-9012',
                    lastReminderDate: '2024-12-08',
                    selected: false
                },
                {
                    id: 6,
                    studentId: 16,
                    studentName: '강도현',
                    grade: '중1',
                    item: '수강료 (중등수학 중급반)',
                    amount: 300000,
                    dueDate: '2024-12-05',
                    overdueDays: 15,
                    phone: '010-6789-0123',
                    lastReminderDate: '',
                    selected: false
                },
                {
                    id: 7,
                    studentId: 17,
                    studentName: '윤서영',
                    grade: '고2',
                    item: '모의고사비',
                    amount: 25000,
                    dueDate: '2024-11-28',
                    overdueDays: 22,
                    phone: '010-7890-1234',
                    lastReminderDate: '2024-12-12',
                    selected: false
                },
                {
                    id: 8,
                    studentId: 18,
                    studentName: '장민서',
                    grade: '중3',
                    item: '수강료 (중등국어 심화반)',
                    amount: 320000,
                    dueDate: '2024-10-20',
                    overdueDays: 61,
                    phone: '010-8901-2345',
                    lastReminderDate: '2024-12-01',
                    selected: false
                },
                {
                    id: 9,
                    studentId: 19,
                    studentName: '오준서',
                    grade: '고1',
                    item: '교재비',
                    amount: 38000,
                    dueDate: '2024-12-10',
                    overdueDays: 10,
                    phone: '010-9012-3456',
                    lastReminderDate: '',
                    selected: false
                },
                {
                    id: 10,
                    studentId: 20,
                    studentName: '임지우',
                    grade: '중2',
                    item: '수강료 (중등영어 중급반)',
                    amount: 300000,
                    dueDate: '2024-10-15',
                    overdueDays: 66,
                    phone: '010-0123-4567',
                    lastReminderDate: '2024-11-25',
                    selected: false
                }
            ],

            // 수납 처리 모달
            showPaymentModal: false,
            paymentData: {
                id: null,
                studentName: '',
                item: '',
                amount: 0,
                paidAmount: 0,
                method: '',
                paymentDate: '',
                memo: ''
            },

            // 독촉 내역 모달
            showHistoryModal: false,
            historyData: {
                studentName: '',
                grade: '',
                item: '',
                amount: 0,
                reminders: []
            }
        };
    },

    computed: {
        // 필터링된 미수납 목록
        filteredUnpaid() {
            let filtered = this.unpaidList;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(unpaid =>
                    unpaid.studentName.toLowerCase().includes(keyword)
                );
            }

            // 학년 필터
            if (this.filters.grade) {
                filtered = filtered.filter(unpaid => unpaid.grade === this.filters.grade);
            }

            // 미납 기간 필터
            if (this.filters.period) {
                filtered = filtered.filter(unpaid => {
                    switch (this.filters.period) {
                        case '1month':
                            return unpaid.overdueDays >= 30;
                        case '2months':
                            return unpaid.overdueDays >= 60;
                        case '3months':
                            return unpaid.overdueDays >= 90;
                        default:
                            return true;
                    }
                });
            }

            // 미납 항목 필터
            if (this.filters.item) {
                filtered = filtered.filter(unpaid => {
                    return unpaid.item.includes(this.getItemText(this.filters.item));
                });
            }

            // 정렬
            filtered.sort((a, b) => {
                switch (this.sortBy) {
                    case 'amount':
                        return b.amount - a.amount;
                    case 'date':
                        return new Date(a.dueDate) - new Date(b.dueDate);
                    case 'name':
                        return a.studentName.localeCompare(b.studentName);
                    default:
                        return 0;
                }
            });

            return filtered;
        }
    },

    mounted() {
        // 미수납 목록 로드
        this.loadUnpaidList();
    },

    methods: {
        // 미수납 목록 로드
        async loadUnpaidList() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/payments/unpaid');
            // this.unpaidList = response.data.unpaid;
            // this.stats = response.data.stats;

            console.log('미수납 목록 로드 완료');
        },

        // 검색 처리
        handleSearch() {
            // 검색어 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 필터 처리
        handleFilter() {
            // 필터 변경 시 실시간 필터링 (computed에서 처리)
        },

        // 정렬 처리
        handleSort() {
            // 정렬 변경 시 실시간 정렬 (computed에서 처리)
        },

        // 필터 초기화
        resetFilters() {
            this.searchKeyword = '';
            this.filters = {
                grade: '',
                period: '',
                item: ''
            };
            this.sortBy = 'amount';
        },

        // 전체 선택/해제
        toggleSelectAll() {
            this.filteredUnpaid.forEach(unpaid => {
                unpaid.selected = this.selectAll;
            });
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 독촉 발송
        async sendReminder(unpaid) {
            if (!confirm(`${unpaid.studentName} 학생에게 납부 독촉을 발송하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.post(`/api/payments/reminder/${unpaid.id}`);

                // 최근 독촉일 업데이트
                const index = this.unpaidList.findIndex(u => u.id === unpaid.id);
                if (index > -1) {
                    this.unpaidList[index].lastReminderDate = new Date().toISOString().split('T')[0];
                }

                alert('납부 독촉이 발송되었습니다.');
                console.log('독촉 발송:', unpaid.id);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 일괄 독촉 발송
        async sendBulkReminder() {
            const selected = this.unpaidList.filter(u => u.selected);
            if (selected.length === 0) {
                alert('독촉을 발송할 학생을 선택해주세요.');
                return;
            }

            if (!confirm(`선택한 ${selected.length}명의 학생에게 납부 독촉을 발송하시겠습니까?`)) {
                return;
            }

            try {
                // 실제로는 API 호출
                // await this.$api.post('/api/payments/bulk-reminder', { ids: selected.map(s => s.id) });

                // 최근 독촉일 업데이트
                const today = new Date().toISOString().split('T')[0];
                selected.forEach(s => {
                    const index = this.unpaidList.findIndex(u => u.id === s.id);
                    if (index > -1) {
                        this.unpaidList[index].lastReminderDate = today;
                        this.unpaidList[index].selected = false;
                    }
                });

                this.selectAll = false;
                alert(`${selected.length}명에게 납부 독촉이 발송되었습니다.`);
                console.log('일괄 독촉 발송:', selected.length);
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 수납 처리
        recordPayment(unpaid) {
            this.paymentData = {
                id: unpaid.id,
                studentName: unpaid.studentName,
                item: unpaid.item,
                amount: unpaid.amount,
                paidAmount: unpaid.amount,
                method: '',
                paymentDate: new Date().toISOString().split('T')[0],
                memo: ''
            };
            this.showPaymentModal = true;
        },

        // 수납 처리 모달 닫기
        closePaymentModal() {
            this.showPaymentModal = false;
            this.paymentData = {
                id: null,
                studentName: '',
                item: '',
                amount: 0,
                paidAmount: 0,
                method: '',
                paymentDate: '',
                memo: ''
            };
        },

        // 수납 처리 제출
        async handlePaymentSubmit() {
            try {
                // 실제로는 API 호출
                // await this.$api.post('/api/payments', this.paymentData);

                // 목록에서 제거
                const index = this.unpaidList.findIndex(u => u.id === this.paymentData.id);
                if (index > -1) {
                    this.unpaidList.splice(index, 1);
                }

                // 통계 업데이트
                this.stats.unpaidStudents--;
                this.stats.totalUnpaid -= this.paymentData.amount;

                alert('수납 처리가 완료되었습니다.');
                console.log('수납 처리:', this.paymentData);
                this.closePaymentModal();
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 독촉 내역 보기
        viewHistory(unpaid) {
            // 실제로는 API 호출하여 독촉 내역 가져오기
            this.historyData = {
                studentName: unpaid.studentName,
                grade: unpaid.grade,
                item: unpaid.item,
                amount: unpaid.amount,
                reminders: [
                    {
                        id: 1,
                        date: '2024-12-10',
                        method: 'SMS',
                        staff: '홍길동',
                        memo: '1차 독촉'
                    },
                    {
                        id: 2,
                        date: '2024-12-05',
                        method: '전화',
                        staff: '김선생',
                        memo: '부모님께 연락'
                    },
                    {
                        id: 3,
                        date: '2024-11-28',
                        method: 'SMS',
                        staff: '홍길동',
                        memo: '안내문 발송'
                    }
                ]
            };
            this.showHistoryModal = true;
        },

        // 독촉 내역 모달 닫기
        closeHistoryModal() {
            this.showHistoryModal = false;
            this.historyData = {
                studentName: '',
                grade: '',
                item: '',
                amount: 0,
                reminders: []
            };
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

        // 미납 기간 배지 클래스 반환
        getPeriodBadgeClass(days) {
            if (days < 30) {
                return 'bg-warning';
            } else if (days < 60) {
                return 'bg-danger';
            } else {
                return 'bg-dark';
            }
        },

        // 금액 포맷팅
        formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR').format(amount);
        }
    }
};
