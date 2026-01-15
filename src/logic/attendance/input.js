export default {
    data() {
        return {
            // 선택 정보
            selectedDate: new Date().toISOString().split('T')[0],
            selectedClass: '',
            statusFilter: '',

            // 수업 목록
            classList: [],

            // 학생 목록
            students: [],

            // 통계
            stats: {
                total: 0,
                present: 0,
                absent: 0,
                lateearly: 0
            }
        };
    },

    computed: {
        // 필터링된 학생 목록
        filteredStudents() {
            if (!this.statusFilter) {
                return this.students;
            }
            return this.students.filter(s => s.status === this.statusFilter);
        }
    },

    mounted() {
        // 초기 스케줄 로드
        this.loadSchedule();
    },

    watch: {
        // 학생 출결 상태 변경 감지하여 통계 업데이트
        students: {
            handler() {
                this.updateStats();
            },
            deep: true
        }
    },

    methods: {
        // 스케줄 로드
        async loadSchedule() {
            if (!this.selectedDate) {
                return;
            }

            try {
                // 실제로는 API 호출
                // const response = await this.$api.get(`/api/schedule?date=${this.selectedDate}`);
                // this.classList = response.data;

                // 더미 데이터
                const dayOfWeek = new Date(this.selectedDate).getDay();
                const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                const selectedDay = weekDays[dayOfWeek];

                this.classList = [
                    {
                        id: 1,
                        name: '고등수학 심화반',
                        teacher: '박선생',
                        time: '18:00-20:00',
                        day: '월요일',
                        students: 15
                    },
                    {
                        id: 2,
                        name: '중등영어 기초반',
                        teacher: '이선생',
                        time: '17:00-19:00',
                        day: '월요일',
                        students: 12
                    },
                    {
                        id: 3,
                        name: '고등물리 심화반',
                        teacher: '최선생',
                        time: '19:00-21:00',
                        day: '월요일',
                        students: 10
                    }
                ].filter(c => c.day === selectedDay);

                console.log('스케줄 로드:', this.selectedDate);
            } catch (error) {
                console.error(error);
                alert('스케줄을 불러오는데 실패했습니다.');
            }
        },

        // 학생 목록 로드
        async loadStudents() {
            if (!this.selectedClass) {
                this.students = [];
                return;
            }

            try {
                // 실제로는 API 호출
                // const response = await this.$api.get(`/api/attendance?classId=${this.selectedClass}&date=${this.selectedDate}`);
                // this.students = response.data;

                // 더미 데이터
                this.students = [
                    {
                        id: 1,
                        studentId: 1,
                        name: '김철수',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-1234-5678'
                    },
                    {
                        id: 2,
                        studentId: 2,
                        name: '이영희',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-2345-6789'
                    },
                    {
                        id: 3,
                        studentId: 3,
                        name: '박민수',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-3456-7890'
                    },
                    {
                        id: 4,
                        studentId: 4,
                        name: '최지훈',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-4567-8901'
                    },
                    {
                        id: 5,
                        studentId: 5,
                        name: '정수진',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-5678-9012'
                    },
                    {
                        id: 6,
                        studentId: 6,
                        name: '강민지',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-6789-0123'
                    },
                    {
                        id: 7,
                        studentId: 7,
                        name: '윤서현',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-7890-1234'
                    },
                    {
                        id: 8,
                        studentId: 8,
                        name: '장동현',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-8901-2345'
                    },
                    {
                        id: 9,
                        studentId: 9,
                        name: '오지은',
                        grade: '고1',
                        status: '',
                        memo: '',
                        phone: '010-9012-3456'
                    },
                    {
                        id: 10,
                        studentId: 10,
                        name: '임준혁',
                        grade: '고1',
                        status: '',
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

        // 출결 상태 설정
        setStatus(student, status) {
            student.status = status;
        },

        // 일괄 상태 설정
        bulkSetStatus(status) {
            if (!this.selectedClass) {
                alert('수업을 먼저 선택해주세요.');
                return;
            }

            if (!confirm(`모든 학생을 ${this.getStatusText(status)}(으)로 설정하시겠습니까?`)) {
                return;
            }

            this.students.forEach(student => {
                student.status = status;
            });
        },

        // 통계 업데이트
        updateStats() {
            this.stats.total = this.students.length;
            this.stats.present = this.students.filter(s => s.status === 'present').length;
            this.stats.absent = this.students.filter(s => s.status === 'absent').length;
            this.stats.lateearly = this.students.filter(s => s.status === 'late' || s.status === 'early').length;
        },

        // 출결 저장
        async saveAttendance() {
            if (!this.selectedClass) {
                alert('수업을 먼저 선택해주세요.');
                return;
            }

            // 미입력 학생 체크
            const notInputted = this.students.filter(s => !s.status);
            if (notInputted.length > 0) {
                if (!confirm(`${notInputted.length}명의 학생이 출결 미입력 상태입니다.\n계속 저장하시겠습니까?`)) {
                    return;
                }
            }

            try {
                // 실제로는 API 호출
                // await this.$api.post('/api/attendance', {
                //     classId: this.selectedClass,
                //     date: this.selectedDate,
                //     attendances: this.students
                // });

                alert('출결이 저장되었습니다.');
                console.log('출결 저장:', {
                    classId: this.selectedClass,
                    date: this.selectedDate,
                    attendances: this.students
                });
            } catch (error) {
                console.error(error);
                alert('출결 저장에 실패했습니다.');
            }
        },

        // 학생 상세보기
        viewStudent(studentId) {
            window.location.hash = `#/students/detail?id=${studentId}`;
        },

        // 학부모 연락
        callParent(student) {
            alert(`학부모 연락\n\n학생: ${student.name}\n연락처: ${student.phone}`);
            console.log('학부모 연락:', student);
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
