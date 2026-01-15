export default {
    name: 'Home',
    layout: 'default',

    data() {
        return {
            // 오늘의 통계
            todayStats: {
                attendanceRate: 87,
                attendanceChange: 5,
                todayClasses: 12,
                ongoingClasses: 3,
                unpaidCount: 8,
                unpaidAmount: 2400000,
                consultations: 5,
                todayConsultations: 2
            },

            // 재원생 추이 데이터
            studentsData: [
                { label: '7월', value: 145, percentage: 72 },
                { label: '8월', value: 152, percentage: 76 },
                { label: '9월', value: 148, percentage: 74 },
                { label: '10월', value: 165, percentage: 83 },
                { label: '11월', value: 172, percentage: 86 },
                { label: '12월', value: 180, percentage: 90 }
            ],

            // 신규/퇴원 데이터
            newStudentsData: {
                new: 18,
                leave: 5,
                newPercentage: 78,
                leavePercentage: 22
            },

            // 월별 매출 데이터 (최근 6개월)
            revenueData: [
                { label: '7월', value: 48, percentage: 76 },
                { label: '8월', value: 51, percentage: 81 },
                { label: '9월', value: 54, percentage: 86 },
                { label: '10월', value: 57, percentage: 90 },
                { label: '11월', value: 60, percentage: 95 },
                { label: '12월', value: 63, percentage: 100 }
            ],

            // 수강 만료 예정 학생
            expiringStudents: [
                { id: 1, name: '김철수', class: '수학 고등부', daysLeft: 3 },
                { id: 2, name: '이영희', class: '영어 중등부', daysLeft: 5 },
                { id: 3, name: '박민수', class: '과학 고등부', daysLeft: 7 },
                { id: 4, name: '최지훈', class: '국어 고등부', daysLeft: 10 },
                { id: 5, name: '정수진', class: '수학 중등부', daysLeft: 14 }
            ]
        };
    },

    mounted() {
        // 통계 데이터 로드
        this.loadDashboardStats();
    },

    methods: {
        // 대시보드 통계 로드
        async loadDashboardStats() {
            // 실제로는 API 호출
            // const response = await this.$api.get('/api/dashboard/stats');
            // this.todayStats = response.data;

            // 현재는 목 데이터 사용
            console.log('대시보드 통계 로드 완료');
        },

        // 금액 포맷팅
        formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
            }).format(amount);
        },

        // 만료 일수에 따른 배지 클래스
        getDaysLeftBadgeClass(daysLeft) {
            if (daysLeft <= 3) {
                return 'bg-danger';
            } else if (daysLeft <= 7) {
                return 'bg-warning';
            } else {
                return 'bg-secondary';
            }
        },

        // 수강 연장 처리
        extendClass(student) {
            if (confirm(`${student.name} 학생의 수강을 연장하시겠습니까?`)) {
                // 실제로는 수강 신청 페이지로 이동
                window.location.hash = '#/classes/enroll?student=' + student.id;
            }
        }
    }
};
