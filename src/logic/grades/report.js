export default {
    data() {
        return {
            searchKeyword: '',
            filters: {
                classId: '',
                period: 'recent'
            },
            selectAll: false,
            students: [
                {
                    id: 1,
                    studentId: 1,
                    name: '김철수',
                    grade: '고1',
                    classId: 1,
                    className: '고등수학 심화반',
                    avgScore: 88.5,
                    examCount: 4,
                    lastExamDate: '2024-12-15',
                    selected: false
                },
                {
                    id: 2,
                    studentId: 2,
                    name: '이영희',
                    grade: '중2',
                    classId: 2,
                    className: '중등영어 기초반',
                    avgScore: 92.3,
                    examCount: 5,
                    lastExamDate: '2024-12-14',
                    selected: false
                },
                {
                    id: 3,
                    studentId: 3,
                    name: '박민수',
                    grade: '고3',
                    classId: 3,
                    className: '고등물리 심화반',
                    avgScore: 85.7,
                    examCount: 3,
                    lastExamDate: '2024-12-13',
                    selected: false
                }
            ]
        };
    },
    computed: {
        filteredStudents() {
            let filtered = this.students;
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(s => s.name.toLowerCase().includes(keyword));
            }
            if (this.filters.classId) {
                filtered = filtered.filter(s => s.classId == this.filters.classId);
            }
            return filtered;
        }
    },
    methods: {
        toggleSelectAll() {
            this.filteredStudents.forEach(s => s.selected = this.selectAll);
        },
        resetFilters() {
            this.searchKeyword = '';
            this.filters = { classId: '', period: 'recent' };
        },
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },
        printReport(student) {
            alert(`성적표 출력\n\n${student.name} 학생의 성적표를 출력합니다.`);
        },
        preview(student) {
            alert(`성적표 미리보기\n\n${student.name}\n평균: ${student.avgScore}점\n시험 횟수: ${student.examCount}회`);
        },
        bulkPrint() {
            const selected = this.students.filter(s => s.selected);
            if (selected.length === 0) {
                alert('출력할 학생을 선택해주세요.');
                return;
            }
            alert(`${selected.length}명의 성적표를 일괄 출력합니다.`);
        }
    }
};
