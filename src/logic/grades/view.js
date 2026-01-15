export default {
    data() {
        return {
            searchKeyword: '',
            filters: {
                classId: '',
                examType: '',
                grade: ''
            },
            sortBy: 'rank',
            stats: {
                average: 85.6,
                aGrade: 28,
                needImprovement: 5,
                total: 89
            },
            records: [
                {
                    id: 1,
                    rank: 1,
                    studentId: 1,
                    studentName: '김철수',
                    studentGrade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    examType: 'midterm',
                    score: 95,
                    gradeLevel: 'A',
                    examDate: '2024-12-10'
                },
                {
                    id: 2,
                    rank: 2,
                    studentId: 2,
                    studentName: '이영희',
                    studentGrade: '중2',
                    classId: 2,
                    className: '중등영어 기초반',
                    examType: 'midterm',
                    score: 92,
                    gradeLevel: 'A',
                    examDate: '2024-12-10'
                },
                {
                    id: 3,
                    rank: 3,
                    studentId: 3,
                    studentName: '박민수',
                    studentGrade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    examType: 'final',
                    score: 88,
                    gradeLevel: 'B',
                    examDate: '2024-12-15'
                }
            ]
        };
    },
    computed: {
        filteredRecords() {
            let filtered = this.records;
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(r => r.studentName.toLowerCase().includes(keyword));
            }
            if (this.filters.classId) {
                filtered = filtered.filter(r => r.classId == this.filters.classId);
            }
            if (this.filters.examType) {
                filtered = filtered.filter(r => r.examType === this.filters.examType);
            }
            if (this.filters.grade) {
                filtered = filtered.filter(r => r.gradeLevel === this.filters.grade);
            }
            return filtered.sort((a, b) => {
                if (this.sortBy === 'rank') return a.rank - b.rank;
                if (this.sortBy === 'score') return b.score - a.score;
                if (this.sortBy === 'name') return a.studentName.localeCompare(b.studentName);
                return 0;
            });
        }
    },
    methods: {
        handleSearch() {},
        handleFilter() {},
        handleSort() {},
        resetFilters() {
            this.searchKeyword = '';
            this.filters = { classId: '', examType: '', grade: '' };
            this.sortBy = 'rank';
        },
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },
        viewDetail(record) {
            alert(`성적 상세\n\n학생: ${record.studentName}\n점수: ${record.score}점\n등급: ${record.gradeLevel}`);
        },
        printReport(record) {
            alert(`성적표 출력\n\n${record.studentName} 성적표를 출력합니다.`);
        },
        exportExcel() {
            alert('엑셀 파일을 다운로드합니다.');
        },
        getExamTypeText(type) {
            const types = {
                midterm: '중간고사',
                final: '기말고사',
                monthly: '월말평가',
                quiz: '퀴즈',
                mock: '모의고사'
            };
            return types[type] || type;
        },
        getGradeBadgeClass(grade) {
            const classes = {
                'A': 'bg-success',
                'B': 'bg-primary',
                'C': 'bg-info',
                'D': 'bg-warning',
                'F': 'bg-danger'
            };
            return classes[grade] || 'bg-secondary';
        }
    }
};
