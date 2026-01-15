export default {
    data() {
        return {
            searchKeyword: '',
            filterLecture: '',
            filterStatus: '',
            showEnrollModal: false,
            showDetailModal: false,
            newEnrollment: {
                studentId: '',
                lectureId: '',
                startDate: new Date().toISOString().split('T')[0]
            },
            selectedEnrollment: {},
            stats: {
                totalStudents: 156,
                activeStudents: 98,
                completedStudents: 42,
                avgProgress: 68
            },
            enrollments: [
                {
                    id: 1,
                    studentName: '김민준',
                    studentGrade: '중1',
                    lectureName: '중등 수학 기초 완성',
                    startDate: '2024-01-10',
                    lastAccess: '2024-01-14',
                    progress: 75,
                    status: '수강중'
                },
                {
                    id: 2,
                    studentName: '이서연',
                    studentGrade: '중2',
                    lectureName: '고등 영문법 정복',
                    startDate: '2024-01-08',
                    lastAccess: '2024-01-15',
                    progress: 100,
                    status: '완료'
                },
                {
                    id: 3,
                    studentName: '박지호',
                    studentGrade: '중3',
                    lectureName: '물리학 입문',
                    startDate: '2024-01-12',
                    lastAccess: '2024-01-13',
                    progress: 45,
                    status: '수강중'
                },
                {
                    id: 4,
                    studentName: '최유진',
                    studentGrade: '고1',
                    lectureName: '중등 수학 기초 완성',
                    startDate: '2024-01-05',
                    lastAccess: '2024-01-15',
                    progress: 90,
                    status: '수강중'
                },
                {
                    id: 5,
                    studentName: '정민수',
                    studentGrade: '중2',
                    lectureName: '고등 영문법 정복',
                    startDate: '2024-01-03',
                    lastAccess: '2024-01-10',
                    progress: 30,
                    status: '중단'
                },
                {
                    id: 6,
                    studentName: '강은지',
                    studentGrade: '고2',
                    lectureName: '물리학 입문',
                    startDate: '2024-01-11',
                    lastAccess: '2024-01-14',
                    progress: 60,
                    status: '수강중'
                }
            ]
        };
    },
    computed: {
        filteredEnrollments() {
            return this.enrollments.filter(enrollment => {
                const matchKeyword = enrollment.studentName.includes(this.searchKeyword) ||
                                    enrollment.lectureName.includes(this.searchKeyword);
                const matchLecture = !this.filterLecture || enrollment.lectureName === this.filterLecture;
                const matchStatus = !this.filterStatus || enrollment.status === this.filterStatus;
                return matchKeyword && matchLecture && matchStatus;
            });
        }
    },
    methods: {
        viewDetail(enrollment) {
            this.selectedEnrollment = { ...enrollment };
            this.showDetailModal = true;
        },
        cancelEnrollment(id) {
            if (confirm('수강을 취소하시겠습니까?')) {
                this.enrollments = this.enrollments.filter(e => e.id !== id);
                alert('수강이 취소되었습니다.');
            }
        },
        saveEnrollment() {
            if (!this.newEnrollment.studentId || !this.newEnrollment.lectureId) {
                alert('학생과 강의를 선택해주세요.');
                return;
            }

            // 실제로는 studentId와 lectureId로 이름을 조회해야 함
            const newEntry = {
                id: Date.now(),
                studentName: '김민준',
                studentGrade: '중1',
                lectureName: '중등 수학 기초 완성',
                startDate: this.newEnrollment.startDate,
                lastAccess: '-',
                progress: 0,
                status: '수강중'
            };

            this.enrollments.unshift(newEntry);
            alert('수강 등록이 완료되었습니다.');
            this.showEnrollModal = false;
            this.resetForm();
        },
        resetForm() {
            this.newEnrollment = {
                studentId: '',
                lectureId: '',
                startDate: new Date().toISOString().split('T')[0]
            };
        }
    }
};
