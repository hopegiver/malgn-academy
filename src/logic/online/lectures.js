export default {
    data() {
        return {
            searchKeyword: '',
            filterCategory: '',
            filterStatus: '',
            showCreateModal: false,
            currentLecture: {
                id: null,
                title: '',
                category: '',
                instructor: '',
                duration: '',
                status: '준비중',
                description: ''
            },
            stats: {
                totalLectures: 24,
                publicLectures: 18,
                totalStudents: 156,
                avgProgress: 68
            },
            lectures: [
                {
                    id: 1,
                    title: '중등 수학 기초 완성',
                    category: '수학',
                    instructor: '김철수',
                    students: 32,
                    duration: '60분',
                    createdDate: '2024-01-15',
                    status: '공개',
                    description: '중등 수학의 기초를 다지는 강의입니다.'
                },
                {
                    id: 2,
                    title: '고등 영문법 정복',
                    category: '영어',
                    instructor: '이영희',
                    students: 28,
                    duration: '90분',
                    createdDate: '2024-01-14',
                    status: '공개',
                    description: '고등 영문법을 완벽하게 정복합니다.'
                },
                {
                    id: 3,
                    title: '물리학 입문',
                    category: '과학',
                    instructor: '박민수',
                    students: 25,
                    duration: '75분',
                    createdDate: '2024-01-13',
                    status: '공개',
                    description: '물리학의 기초 개념을 학습합니다.'
                },
                {
                    id: 4,
                    title: '국어 독해 전략',
                    category: '국어',
                    instructor: '최유진',
                    students: 30,
                    duration: '60분',
                    createdDate: '2024-01-12',
                    status: '공개',
                    description: '국어 독해 능력을 향상시키는 전략을 배웁니다.'
                },
                {
                    id: 5,
                    title: '미적분 심화',
                    category: '수학',
                    instructor: '김철수',
                    students: 18,
                    duration: '120분',
                    createdDate: '2024-01-11',
                    status: '비공개',
                    description: '미적분 심화 과정입니다.'
                },
                {
                    id: 6,
                    title: '화학 실험 기초',
                    category: '과학',
                    instructor: '박민수',
                    students: 23,
                    duration: '90분',
                    createdDate: '2024-01-10',
                    status: '준비중',
                    description: '화학 실험의 기초를 배웁니다.'
                }
            ]
        };
    },
    computed: {
        filteredLectures() {
            return this.lectures.filter(lecture => {
                const matchKeyword = lecture.title.includes(this.searchKeyword) ||
                                    lecture.instructor.includes(this.searchKeyword);
                const matchCategory = !this.filterCategory || lecture.category === this.filterCategory;
                const matchStatus = !this.filterStatus || lecture.status === this.filterStatus;
                return matchKeyword && matchCategory && matchStatus;
            });
        }
    },
    methods: {
        editLecture(lecture) {
            this.currentLecture = { ...lecture };
            this.showCreateModal = true;
        },
        deleteLecture(id) {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.lectures = this.lectures.filter(l => l.id !== id);
                alert('삭제되었습니다.');
            }
        },
        saveLecture() {
            if (!this.currentLecture.title || !this.currentLecture.category || !this.currentLecture.instructor) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            if (this.currentLecture.id) {
                // 수정
                const index = this.lectures.findIndex(l => l.id === this.currentLecture.id);
                if (index !== -1) {
                    this.lectures[index] = { ...this.currentLecture };
                }
                alert('수정되었습니다.');
            } else {
                // 등록
                this.currentLecture.id = Date.now();
                this.currentLecture.createdDate = new Date().toISOString().split('T')[0];
                this.currentLecture.students = 0;
                this.lectures.unshift({ ...this.currentLecture });
                alert('등록되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },
        resetForm() {
            this.currentLecture = {
                id: null,
                title: '',
                category: '',
                instructor: '',
                duration: '',
                status: '준비중',
                description: ''
            };
        }
    }
};
