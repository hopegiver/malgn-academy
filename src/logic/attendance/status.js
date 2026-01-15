export default {
    data() {
        return {
            // 검색 및 필터
            searchKeyword: '',
            filters: {
                classId: '',
                period: 'month',
                attendanceRate: ''
            },
            sortBy: 'rate',

            // 통계
            stats: {
                avgRate: 87.5,
                excellent: 45,
                needAttention: 8,
                totalDays: 24
            },

            // 출결 현황 목록
            records: [
                {
                    id: 1,
                    studentId: 1,
                    studentName: '김철수',
                    grade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    present: 20,
                    absent: 2,
                    late: 1,
                    early: 1,
                    total: 24,
                    rate: 83.3
                },
                {
                    id: 2,
                    studentId: 2,
                    studentName: '이영희',
                    grade: '중2',
                    classId: 2,
                    className: '중등영어 기초반',
                    present: 22,
                    absent: 1,
                    late: 0,
                    early: 1,
                    total: 24,
                    rate: 91.7
                },
                {
                    id: 3,
                    studentId: 3,
                    studentName: '박민수',
                    grade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    present: 23,
                    absent: 0,
                    late: 1,
                    early: 0,
                    total: 24,
                    rate: 95.8
                },
                {
                    id: 4,
                    studentId: 4,
                    studentName: '최지훈',
                    grade: '중1',
                    classId: 4,
                    className: '중등수학 중급반',
                    present: 18,
                    absent: 4,
                    late: 2,
                    early: 0,
                    total: 24,
                    rate: 75.0
                },
                {
                    id: 5,
                    studentId: 5,
                    studentName: '정수진',
                    grade: '고2',
                    classId: 1,
                    className: '고등수학 심화반',
                    present: 24,
                    absent: 0,
                    late: 0,
                    early: 0,
                    total: 24,
                    rate: 100
                },
                {
                    id: 6,
                    studentId: 6,
                    studentName: '강민지',
                    grade: '중3',
                    classId: 2,
                    className: '중등영어 기초반',
                    present: 21,
                    absent: 2,
                    late: 1,
                    early: 0,
                    total: 24,
                    rate: 87.5
                },
                {
                    id: 7,
                    studentId: 7,
                    studentName: '윤서현',
                    grade: '고2',
                    classId: 1,
                    className: '고등수학 심화반',
                    present: 19,
                    absent: 3,
                    late: 1,
                    early: 1,
                    total: 24,
                    rate: 79.2
                },
                {
                    id: 8,
                    studentId: 8,
                    studentName: '장동현',
                    grade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    present: 22,
                    absent: 1,
                    late: 0,
                    early: 1,
                    total: 24,
                    rate: 91.7
                },
                {
                    id: 9,
                    studentId: 9,
                    studentName: '오지은',
                    grade: '중1',
                    classId: 4,
                    className: '중등수학 중급반',
                    present: 15,
                    absent: 6,
                    late: 2,
                    early: 1,
                    total: 24,
                    rate: 62.5
                },
                {
                    id: 10,
                    studentId: 10,
                    studentName: '임준혁',
                    grade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    present: 23,
                    absent: 0,
                    late: 1,
                    early: 0,
                    total: 24,
                    rate: 95.8
                }
            ],

            // 상세 모달
            showDetailModal: false,
            detailData: {
                studentName: '',
                grade: '',
                className: '',
                present: 0,
                absent: 0,
                late: 0,
                early: 0,
                rate: 0,
                details: []
            }
        };
    },

    computed: {
        // 필터링된 출결 현황
        filteredRecords() {
            let filtered = this.records;

            // 검색어 필터
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(record =>
                    record.studentName.toLowerCase().includes(keyword)
                );
            }

            // 수업 필터
            if (this.filters.classId) {
                filtered = filtered.filter(record => record.classId == this.filters.classId);
            }

            // 출석률 필터
            if (this.filters.attendanceRate) {
                filtered = filtered.filter(record => {
                    switch (this.filters.attendanceRate) {
                        case 'high':
                            return record.rate >= 80;
                        case 'medium':
                            return record.rate >= 50 && record.rate < 80;
                        case 'low':
                            return record.rate < 50;
                        default:
                            return true;
                    }
                });
            }

            // 정렬
            filtered.sort((a, b) => {
                switch (this.sortBy) {
                    case 'rate':
                        return b.rate - a.rate;
                    case 'absent':
                        return b.absent - a.absent;
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
        // 출결 현황 로드
        this.loadRecords();
    },

    methods: {
        // 출결 현황 로드
        async loadRecords() {
            // 실제로는 API 호출
            // const response = await this.$api.get(`/api/attendance/status?period=${this.filters.period}`);
            // this.records = response.data.records;
            // this.stats = response.data.stats;

            console.log('출결 현황 로드 완료');
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
                classId: '',
                period: 'month',
                attendanceRate: ''
            };
            this.sortBy = 'rate';
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 출결 상세 보기
        viewDetail(record) {
            // 실제로는 API 호출하여 상세 출결 내역 가져오기
            this.detailData = {
                studentName: record.studentName,
                grade: record.grade,
                className: record.className,
                present: record.present,
                absent: record.absent,
                late: record.late,
                early: record.early,
                rate: record.rate,
                details: [
                    {
                        id: 1,
                        date: '2024-12-20',
                        day: '금요일',
                        status: 'present',
                        memo: ''
                    },
                    {
                        id: 2,
                        date: '2024-12-18',
                        day: '수요일',
                        status: 'present',
                        memo: ''
                    },
                    {
                        id: 3,
                        date: '2024-12-16',
                        day: '월요일',
                        status: 'late',
                        memo: '교통 체증'
                    },
                    {
                        id: 4,
                        date: '2024-12-13',
                        day: '금요일',
                        status: 'present',
                        memo: ''
                    },
                    {
                        id: 5,
                        date: '2024-12-11',
                        day: '수요일',
                        status: 'absent',
                        memo: '독감'
                    },
                    {
                        id: 6,
                        date: '2024-12-09',
                        day: '월요일',
                        status: 'present',
                        memo: ''
                    },
                    {
                        id: 7,
                        date: '2024-12-06',
                        day: '금요일',
                        status: 'present',
                        memo: ''
                    },
                    {
                        id: 8,
                        date: '2024-12-04',
                        day: '수요일',
                        status: 'early',
                        memo: '병원 예약'
                    }
                ]
            };
            this.showDetailModal = true;
        },

        // 상세 모달 닫기
        closeDetailModal() {
            this.showDetailModal = false;
            this.detailData = {
                studentName: '',
                grade: '',
                className: '',
                present: 0,
                absent: 0,
                late: 0,
                early: 0,
                rate: 0,
                details: []
            };
        },

        // 메시지 발송
        sendMessage(record) {
            alert(`안내 메시지 발송\n\n학생: ${record.studentName}\n출석률: ${record.rate}%\n결석: ${record.absent}일`);
            console.log('메시지 발송:', record);
        },

        // 엑셀 다운로드
        exportExcel() {
            alert('출결 현황을 엑셀 파일로 다운로드합니다.');
            console.log('엑셀 다운로드:', this.filteredRecords);
        },

        // 출석률 배지 클래스 반환
        getRateBadgeClass(rate) {
            if (rate >= 90) {
                return 'bg-success';
            } else if (rate >= 80) {
                return 'bg-primary';
            } else if (rate >= 70) {
                return 'bg-warning';
            } else {
                return 'bg-danger';
            }
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                present: 'bg-success',
                absent: 'bg-danger',
                late: 'bg-warning',
                early: 'bg-warning'
            };
            return classMap[status] || 'bg-secondary';
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                present: '출석',
                absent: '결석',
                late: '지각',
                early: '조퇴'
            };
            return statusMap[status] || status;
        }
    }
};
