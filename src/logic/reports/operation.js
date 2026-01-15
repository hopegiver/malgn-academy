export default {
    data() {
        return {
            period: 'month',
            filters: {
                grade: ''
            },
            gradeStats: [
                { name: '초등부', current: 45, new: 8, left: 2, attendance: 92 },
                { name: '중등부', current: 58, new: 12, left: 5, attendance: 88 },
                { name: '고등부', current: 42, new: 6, left: 3, attendance: 85 }
            ],
            monthlyTrends: [
                { month: '2026-01', students: 145, newStudents: 26, leftStudents: 10, attendance: 89, avgCourses: 2.8 },
                { month: '2025-12', students: 129, newStudents: 18, leftStudents: 8, attendance: 87, avgCourses: 2.6 },
                { month: '2025-11', students: 119, newStudents: 15, leftStudents: 12, attendance: 86, avgCourses: 2.5 },
                { month: '2025-10', students: 116, newStudents: 20, leftStudents: 6, attendance: 88, avgCourses: 2.7 },
                { month: '2025-09', students: 102, newStudents: 22, leftStudents: 4, attendance: 90, avgCourses: 2.9 },
                { month: '2025-08', students: 84, newStudents: 16, leftStudents: 8, attendance: 85, avgCourses: 2.4 }
            ],
            subjectStats: [
                { name: '수학', students: 98, classes: 8, attendance: 91, satisfaction: '매우좋음' },
                { name: '영어', students: 87, classes: 7, attendance: 89, satisfaction: '좋음' },
                { name: '국어', students: 76, classes: 6, attendance: 88, satisfaction: '좋음' },
                { name: '과학', students: 54, classes: 4, attendance: 86, satisfaction: '보통' },
                { name: '사회', students: 42, classes: 3, attendance: 87, satisfaction: '보통' }
            ]
        };
    },

    computed: {
        stats() {
            return {
                currentStudents: 145,
                newStudents: 26,
                attendanceRate: 89,
                totalCourses: 28
            };
        }
    },

    methods: {
        handlePeriodChange() {
            // 기간 변경 처리
            console.log('기간 변경:', this.period);

            // 실제로는 API 호출하여 데이터 갱신
            switch (this.period) {
                case 'month':
                    this.monthlyTrends = [
                        { month: '2026-01', students: 145, newStudents: 26, leftStudents: 10, attendance: 89, avgCourses: 2.8 }
                    ];
                    break;
                case 'quarter':
                    this.monthlyTrends = [
                        { month: '2026-01', students: 145, newStudents: 26, leftStudents: 10, attendance: 89, avgCourses: 2.8 },
                        { month: '2025-12', students: 129, newStudents: 18, leftStudents: 8, attendance: 87, avgCourses: 2.6 },
                        { month: '2025-11', students: 119, newStudents: 15, leftStudents: 12, attendance: 86, avgCourses: 2.5 }
                    ];
                    break;
                case 'half':
                    this.monthlyTrends = [
                        { month: '2026-01', students: 145, newStudents: 26, leftStudents: 10, attendance: 89, avgCourses: 2.8 },
                        { month: '2025-12', students: 129, newStudents: 18, leftStudents: 8, attendance: 87, avgCourses: 2.6 },
                        { month: '2025-11', students: 119, newStudents: 15, leftStudents: 12, attendance: 86, avgCourses: 2.5 },
                        { month: '2025-10', students: 116, newStudents: 20, leftStudents: 6, attendance: 88, avgCourses: 2.7 },
                        { month: '2025-09', students: 102, newStudents: 22, leftStudents: 4, attendance: 90, avgCourses: 2.9 },
                        { month: '2025-08', students: 84, newStudents: 16, leftStudents: 8, attendance: 85, avgCourses: 2.4 }
                    ];
                    break;
                case 'year':
                    this.monthlyTrends = [
                        { month: '2026-01', students: 145, newStudents: 26, leftStudents: 10, attendance: 89, avgCourses: 2.8 },
                        { month: '2025-12', students: 129, newStudents: 18, leftStudents: 8, attendance: 87, avgCourses: 2.6 },
                        { month: '2025-11', students: 119, newStudents: 15, leftStudents: 12, attendance: 86, avgCourses: 2.5 },
                        { month: '2025-10', students: 116, newStudents: 20, leftStudents: 6, attendance: 88, avgCourses: 2.7 },
                        { month: '2025-09', students: 102, newStudents: 22, leftStudents: 4, attendance: 90, avgCourses: 2.9 },
                        { month: '2025-08', students: 84, newStudents: 16, leftStudents: 8, attendance: 85, avgCourses: 2.4 },
                        { month: '2025-07', students: 76, newStudents: 14, leftStudents: 5, attendance: 83, avgCourses: 2.3 },
                        { month: '2025-06', students: 67, newStudents: 19, leftStudents: 7, attendance: 84, avgCourses: 2.5 },
                        { month: '2025-05', students: 55, newStudents: 12, leftStudents: 6, attendance: 86, avgCourses: 2.4 },
                        { month: '2025-04', students: 49, newStudents: 15, leftStudents: 4, attendance: 87, avgCourses: 2.6 },
                        { month: '2025-03', students: 38, newStudents: 18, leftStudents: 3, attendance: 88, avgCourses: 2.7 },
                        { month: '2025-02', students: 23, newStudents: 10, leftStudents: 2, attendance: 85, avgCourses: 2.2 }
                    ];
                    break;
            }
        },

        handleFilter() {
            // 필터 처리
            console.log('필터 변경:', this.filters.grade);

            // 실제로는 필터에 맞는 데이터로 갱신
            if (this.filters.grade === 'elementary') {
                this.gradeStats = [
                    { name: '초등부', current: 45, new: 8, left: 2, attendance: 92 }
                ];
            } else if (this.filters.grade === 'middle') {
                this.gradeStats = [
                    { name: '중등부', current: 58, new: 12, left: 5, attendance: 88 }
                ];
            } else if (this.filters.grade === 'high') {
                this.gradeStats = [
                    { name: '고등부', current: 42, new: 6, left: 3, attendance: 85 }
                ];
            } else {
                this.gradeStats = [
                    { name: '초등부', current: 45, new: 8, left: 2, attendance: 92 },
                    { name: '중등부', current: 58, new: 12, left: 5, attendance: 88 },
                    { name: '고등부', current: 42, new: 6, left: 3, attendance: 85 }
                ];
            }
        },

        getSatisfactionBadgeClass(satisfaction) {
            const classes = {
                '매우좋음': 'bg-success',
                '좋음': 'bg-primary',
                '보통': 'bg-secondary',
                '나쁨': 'bg-warning',
                '매우나쁨': 'bg-danger'
            };
            return classes[satisfaction] || 'bg-secondary';
        },

        exportReport() {
            alert('운영 현황 보고서를 다운로드합니다.');
            // 실제로는 PDF 또는 Excel 파일 생성 및 다운로드
        }
    },

    mounted() {
        console.log('운영 현황 페이지 로드됨');
    }
};
