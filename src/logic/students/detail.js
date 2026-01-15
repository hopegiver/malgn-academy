export default {
    data() {
        return {
            // 활성 탭
            activeTab: 'classes',

            // 학생 정보
            student: {
                id: 1,
                name: '김철수',
                initial: '김',
                gradeText: '고등 2학년',
                school: '서울고등학교',
                birthDate: '2007-05-15',
                gender: '남',
                phone: '010-1234-5678',
                parentName: '김영희',
                parentRelation: '모',
                parentPhone: '010-9876-5432',
                address: '서울시 강남구 테헤란로 123',
                status: 'active',
                registeredAt: '2024-03-15'
            },

            // 수강 현황
            classes: [
                {
                    id: 1,
                    subject: '수학',
                    teacher: '박선생',
                    schedule: '월/수/금 18:00-20:00',
                    startDate: '2024-03-01',
                    endDate: '2024-06-30',
                    totalCount: 48,
                    remainingCount: 32,
                    status: 'active'
                },
                {
                    id: 2,
                    subject: '영어',
                    teacher: '이선생',
                    schedule: '화/목 19:00-21:00',
                    startDate: '2024-03-01',
                    endDate: '2024-06-30',
                    totalCount: 32,
                    remainingCount: 3,
                    status: 'active'
                }
            ],

            // 출결 통계
            attendanceStats: {
                rate: 95,
                present: 86,
                absent: 3,
                late: 2
            },

            // 출결 기록
            attendanceRecords: [
                {
                    id: 1,
                    date: '2024-12-20',
                    subject: '수학',
                    status: 'present',
                    note: ''
                },
                {
                    id: 2,
                    date: '2024-12-19',
                    subject: '영어',
                    status: 'present',
                    note: ''
                },
                {
                    id: 3,
                    date: '2024-12-18',
                    subject: '수학',
                    status: 'late',
                    note: '10분 지각'
                },
                {
                    id: 4,
                    date: '2024-12-17',
                    subject: '영어',
                    status: 'absent',
                    note: '병가'
                },
                {
                    id: 5,
                    date: '2024-12-16',
                    subject: '수학',
                    status: 'present',
                    note: ''
                }
            ],

            // 성적 현황
            grades: [
                {
                    id: 1,
                    examDate: '2024-11-20',
                    subject: '수학',
                    examName: '2학기 중간고사',
                    score: 95,
                    grade: 1,
                    rank: '5/180'
                },
                {
                    id: 2,
                    examDate: '2024-11-20',
                    subject: '영어',
                    examName: '2학기 중간고사',
                    score: 88,
                    grade: 2,
                    rank: '15/180'
                },
                {
                    id: 3,
                    examDate: '2024-09-15',
                    subject: '수학',
                    examName: '1학기 기말고사',
                    score: 92,
                    grade: 1,
                    rank: '8/180'
                }
            ],

            // 상담 기록
            counselingRecords: [
                {
                    id: 1,
                    date: '2024-12-10',
                    title: '진로 상담',
                    type: 'career',
                    counselor: '홍길동 원장',
                    content: '이공계 진학 희망. 수학 성적이 우수하여 공대 진학을 추천함. 학생도 컴퓨터공학에 관심이 많아 관련 학과 정보 제공.'
                },
                {
                    id: 2,
                    date: '2024-11-25',
                    title: '학습 상담',
                    type: 'study',
                    counselor: '박선생',
                    content: '수학 심화반 추가 수강 권유. 현재 진도는 무난하게 따라오고 있으나, 더 높은 수준의 문제 풀이 연습이 필요함.'
                },
                {
                    id: 3,
                    date: '2024-10-15',
                    title: '학부모 상담',
                    type: 'parent',
                    counselor: '이선생',
                    content: '영어 성적 향상을 위한 학습 방법 논의. 독해 위주의 학습에서 듣기와 말하기 연습을 병행할 것을 권유함.'
                }
            ],

            // 수납 통계
            paymentStats: {
                totalPaid: 3600000,
                unpaid: 400000,
                refund: 0
            },

            // 수납 기록
            paymentRecords: [
                {
                    id: 1,
                    date: '2024-12-01',
                    item: '수학 수업료 (12월)',
                    amount: 400000,
                    method: '카드',
                    status: 'paid'
                },
                {
                    id: 2,
                    date: '2024-12-01',
                    item: '영어 수업료 (12월)',
                    amount: 400000,
                    method: '계좌이체',
                    status: 'unpaid'
                },
                {
                    id: 3,
                    date: '2024-11-01',
                    item: '수학 수업료 (11월)',
                    amount: 400000,
                    method: '카드',
                    status: 'paid'
                },
                {
                    id: 4,
                    date: '2024-11-01',
                    item: '영어 수업료 (11월)',
                    amount: 400000,
                    method: '현금',
                    status: 'paid'
                }
            ]
        };
    },

    mounted() {
        // URL에서 학생 ID 가져오기
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const studentId = urlParams.get('id');

        if (studentId) {
            this.loadStudentDetail(studentId);
        }
    },

    methods: {
        // 학생 상세 정보 로드
        async loadStudentDetail(studentId) {
            // 실제로는 API 호출
            // const response = await this.$api.get(`/api/students/${studentId}`);
            // this.student = response.data;

            console.log('학생 상세 정보 로드:', studentId);
        },

        // 학생 수정
        editStudent() {
            window.location.hash = '#/students/register?id=' + this.student.id;
        },

        // 상담 추가
        addCounseling() {
            alert('상담 추가 기능은 추후 구현 예정입니다.');
        },

        // 상태 텍스트 반환
        getStatusText(status) {
            const statusMap = {
                active: '재원중',
                inactive: '퇴원',
                hold: '휴원'
            };
            return statusMap[status] || status;
        },

        // 상태 배지 클래스 반환
        getStatusBadgeClass(status) {
            const classMap = {
                active: 'bg-success',
                inactive: 'bg-secondary',
                hold: 'bg-warning'
            };
            return classMap[status] || 'bg-secondary';
        },

        // 출결 상태 텍스트 반환
        getAttendanceText(status) {
            const statusMap = {
                present: '출석',
                absent: '결석',
                late: '지각',
                excused: '조퇴'
            };
            return statusMap[status] || status;
        },

        // 출결 상태 배지 클래스 반환
        getAttendanceBadgeClass(status) {
            const classMap = {
                present: 'bg-success',
                absent: 'bg-danger',
                late: 'bg-warning',
                excused: 'bg-info'
            };
            return classMap[status] || 'bg-secondary';
        },

        // 상담 유형 텍스트 반환
        getCounselingTypeText(type) {
            const typeMap = {
                career: '진로',
                study: '학습',
                parent: '학부모',
                behavior: '생활'
            };
            return typeMap[type] || type;
        },

        // 상담 유형 배지 클래스 반환
        getCounselingTypeBadge(type) {
            const classMap = {
                career: 'bg-primary',
                study: 'bg-success',
                parent: 'bg-info',
                behavior: 'bg-warning'
            };
            return classMap[type] || 'bg-secondary';
        },

        // 수납 상태 텍스트 반환
        getPaymentStatusText(status) {
            const statusMap = {
                paid: '완납',
                unpaid: '미납',
                partial: '부분납',
                refund: '환불'
            };
            return statusMap[status] || status;
        },

        // 수납 상태 배지 클래스 반환
        getPaymentStatusBadge(status) {
            const classMap = {
                paid: 'bg-success',
                unpaid: 'bg-danger',
                partial: 'bg-warning',
                refund: 'bg-secondary'
            };
            return classMap[status] || 'bg-secondary';
        },

        // 금액 포맷팅
        formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
            }).format(amount);
        }
    }
};
