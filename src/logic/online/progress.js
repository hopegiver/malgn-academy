export default {
    data() {
        return {
            searchKeyword: '',
            filterLecture: '',
            filterProgress: '',
            showDetailModal: false,
            selectedItem: {},
            stats: {
                avgProgress: 68,
                avgStudyTime: 12.5,
                completionRate: 42,
                activeStudents: 98
            },
            progressList: [
                {
                    id: 1,
                    studentName: '김민준',
                    studentGrade: '중1',
                    lectureName: '중등 수학 기초 완성',
                    studyTime: 15.5,
                    completedLessons: 8,
                    totalLessons: 12,
                    progress: 75,
                    lastAccess: '2024-01-14 15:30'
                },
                {
                    id: 2,
                    studentName: '이서연',
                    studentGrade: '중2',
                    lectureName: '고등 영문법 정복',
                    studyTime: 22.0,
                    completedLessons: 15,
                    totalLessons: 15,
                    progress: 100,
                    lastAccess: '2024-01-15 10:20'
                },
                {
                    id: 3,
                    studentName: '박지호',
                    studentGrade: '중3',
                    lectureName: '물리학 입문',
                    studyTime: 8.5,
                    completedLessons: 5,
                    totalLessons: 10,
                    progress: 45,
                    lastAccess: '2024-01-13 18:45'
                },
                {
                    id: 4,
                    studentName: '최유진',
                    studentGrade: '고1',
                    lectureName: '중등 수학 기초 완성',
                    studyTime: 18.0,
                    completedLessons: 11,
                    totalLessons: 12,
                    progress: 90,
                    lastAccess: '2024-01-15 14:10'
                },
                {
                    id: 5,
                    studentName: '정민수',
                    studentGrade: '중2',
                    lectureName: '고등 영문법 정복',
                    studyTime: 5.5,
                    completedLessons: 4,
                    totalLessons: 15,
                    progress: 30,
                    lastAccess: '2024-01-10 20:15'
                },
                {
                    id: 6,
                    studentName: '강은지',
                    studentGrade: '고2',
                    lectureName: '물리학 입문',
                    studyTime: 11.0,
                    completedLessons: 6,
                    totalLessons: 10,
                    progress: 60,
                    lastAccess: '2024-01-14 16:30'
                }
            ]
        };
    },
    computed: {
        filteredProgress() {
            return this.progressList.filter(item => {
                const matchKeyword = item.studentName.includes(this.searchKeyword);
                const matchLecture = !this.filterLecture || item.lectureName === this.filterLecture;

                let matchProgress = true;
                if (this.filterProgress === 'high') {
                    matchProgress = item.progress >= 80;
                } else if (this.filterProgress === 'medium') {
                    matchProgress = item.progress >= 50 && item.progress < 80;
                } else if (this.filterProgress === 'low') {
                    matchProgress = item.progress < 50;
                }

                return matchKeyword && matchLecture && matchProgress;
            });
        }
    },
    methods: {
        viewDetail(item) {
            this.selectedItem = { ...item };
            this.showDetailModal = true;
        },
        exportExcel() {
            alert('엑셀 파일로 다운로드됩니다.');
            console.log('학습 현황 엑셀 다운로드');
        }
    }
};
