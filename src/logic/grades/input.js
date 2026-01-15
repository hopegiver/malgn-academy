export default {
    data() {
        return {
            // 선택 정보
            selectedClass: '',
            selectedExamType: '',
            examDate: new Date().toISOString().split('T')[0],
            fullScore: 100,

            // 학생 목록
            students: [],

            // 통계
            stats: {
                average: 0,
                highest: 0,
                lowest: 0,
                inputted: 0,
                total: 0
            }
        };
    },

    computed: {
        // 순위별 정렬된 학생 목록
        rankedStudents() {
            return this.students.slice().sort((a, b) => {
                if (a.score === null || a.score === '') return 1;
                if (b.score === null || b.score === '') return -1;
                return b.score - a.score;
            });
        }
    },

    watch: {
        // 학생 성적 변경 감지하여 통계 및 등급 업데이트
        students: {
            handler() {
                this.calculateStats();
                this.calculateGrades();
            },
            deep: true
        }
    },

    methods: {
        // 학생 목록 로드
        async loadStudents() {
            if (!this.selectedClass) {
                this.students = [];
                return;
            }

            try {
                // 실제로는 API 호출
                // const response = await this.$api.get(`/api/grades/students?classId=${this.selectedClass}`);
                // this.students = response.data;

                // 더미 데이터
                this.students = [
                    {
                        id: 1,
                        studentId: 1,
                        name: '김철수',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-1234-5678'
                    },
                    {
                        id: 2,
                        studentId: 2,
                        name: '이영희',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-2345-6789'
                    },
                    {
                        id: 3,
                        studentId: 3,
                        name: '박민수',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-3456-7890'
                    },
                    {
                        id: 4,
                        studentId: 4,
                        name: '최지훈',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-4567-8901'
                    },
                    {
                        id: 5,
                        studentId: 5,
                        name: '정수진',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-5678-9012'
                    },
                    {
                        id: 6,
                        studentId: 6,
                        name: '강민지',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-6789-0123'
                    },
                    {
                        id: 7,
                        studentId: 7,
                        name: '윤서현',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-7890-1234'
                    },
                    {
                        id: 8,
                        studentId: 8,
                        name: '장동현',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-8901-2345'
                    },
                    {
                        id: 9,
                        studentId: 9,
                        name: '오지은',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-9012-3456'
                    },
                    {
                        id: 10,
                        studentId: 10,
                        name: '임준혁',
                        grade: '고1',
                        score: null,
                        gradeLevel: '',
                        rank: null,
                        memo: '',
                        phone: '010-0123-4567'
                    }
                ];

                console.log('학생 목록 로드:', this.selectedClass);
            } catch (error) {
                console.error(error);
                alert('학생 목록을 불러오는데 실패했습니다.');
            }
        },

        // 순위 업데이트
        updateRank() {
            const sorted = this.rankedStudents;
            sorted.forEach((student, index) => {
                if (student.score !== null && student.score !== '') {
                    student.rank = index + 1;
                } else {
                    student.rank = null;
                }
            });
        },

        // 등급 계산
        calculateGrades() {
            const validScores = this.students.filter(s => s.score !== null && s.score !== '');

            if (validScores.length === 0) return;

            validScores.forEach(student => {
                const percentage = (student.score / this.fullScore) * 100;

                if (percentage >= 90) {
                    student.gradeLevel = 'A';
                } else if (percentage >= 80) {
                    student.gradeLevel = 'B';
                } else if (percentage >= 70) {
                    student.gradeLevel = 'C';
                } else if (percentage >= 60) {
                    student.gradeLevel = 'D';
                } else {
                    student.gradeLevel = 'F';
                }
            });
        },

        // 통계 계산
        calculateStats() {
            const validScores = this.students
                .filter(s => s.score !== null && s.score !== '')
                .map(s => Number(s.score));

            if (validScores.length === 0) {
                this.stats = {
                    average: 0,
                    highest: 0,
                    lowest: 0,
                    inputted: 0,
                    total: this.students.length
                };
                return;
            }

            const sum = validScores.reduce((acc, score) => acc + score, 0);
            const average = (sum / validScores.length).toFixed(1);

            this.stats = {
                average: average,
                highest: Math.max(...validScores),
                lowest: Math.min(...validScores),
                inputted: validScores.length,
                total: this.students.length
            };
        },

        // 전체 초기화
        clearAll() {
            if (!confirm('모든 점수를 초기화하시겠습니까?')) {
                return;
            }

            this.students.forEach(student => {
                student.score = null;
                student.gradeLevel = '';
                student.rank = null;
            });
        },

        // 성적 저장
        async saveGrades() {
            if (!this.selectedClass || !this.selectedExamType || !this.examDate) {
                alert('수업, 시험 유형, 시험일을 모두 선택해주세요.');
                return;
            }

            // 미입력 학생 체크
            const notInputted = this.students.filter(s => s.score === null || s.score === '');
            if (notInputted.length > 0) {
                if (!confirm(`${notInputted.length}명의 학생이 성적 미입력 상태입니다.\n계속 저장하시겠습니까?`)) {
                    return;
                }
            }

            try {
                // 실제로는 API 호출
                // await this.$api.post('/api/grades', {
                //     classId: this.selectedClass,
                //     examType: this.selectedExamType,
                //     examDate: this.examDate,
                //     fullScore: this.fullScore,
                //     grades: this.students
                // });

                alert('성적이 저장되었습니다.');
                console.log('성적 저장:', {
                    classId: this.selectedClass,
                    examType: this.selectedExamType,
                    examDate: this.examDate,
                    fullScore: this.fullScore,
                    grades: this.students
                });
            } catch (error) {
                console.error(error);
                alert('성적 저장에 실패했습니다.');
            }
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 학부모 연락
        callParent(student) {
            alert(`학부모 연락\n\n학생: ${student.name}\n연락처: ${student.phone}\n점수: ${student.score || '미입력'}`);
            console.log('학부모 연락:', student);
        },

        // 등급 배지 클래스 반환
        getGradeBadgeClass(gradeLevel) {
            const classMap = {
                'A': 'bg-success',
                'B': 'bg-primary',
                'C': 'bg-info',
                'D': 'bg-warning',
                'F': 'bg-danger'
            };
            return classMap[gradeLevel] || 'bg-secondary';
        }
    }
};
