export default {
    data() {
        return {
            searchKeyword: '',
            filterBoard: '',
            filterStatus: '',
            showCreateModal: false,
            showBoardManageModal: false,
            currentPost: {
                id: null,
                board: '',
                title: '',
                content: '',
                status: '게시',
                author: '관리자'
            },
            boards: [
                { id: 1, name: '공지사항', type: '공지' },
                { id: 2, name: '학원소식', type: '일반' },
                { id: 3, name: '자료실', type: '자료' },
                { id: 4, name: '갤러리', type: '갤러리' }
            ],
            newBoard: {
                name: '',
                type: ''
            },
            editBoard: {
                name: '',
                type: ''
            },
            editingBoardId: null,
            stats: {
                totalPosts: 156,
                weekPosts: 12,
                totalViews: 8543,
                totalComments: 89
            },
            posts: [
                {
                    id: 1,
                    board: '공지사항',
                    title: '2024년 1월 학사일정 안내',
                    author: '관리자',
                    createdDate: '2024-01-15',
                    views: 523,
                    comments: 5,
                    status: '게시',
                    content: '2024년 1월 학사일정을 안내드립니다.'
                },
                {
                    id: 2,
                    title: '겨울방학 특강 안내',
                    board: '학원소식',
                    author: '관리자',
                    createdDate: '2024-01-14',
                    views: 412,
                    comments: 8,
                    status: '게시',
                    content: '겨울방학 특강을 안내드립니다.'
                },
                {
                    id: 3,
                    board: '자료실',
                    title: '수학 학습자료 (중등)',
                    author: '김철수',
                    createdDate: '2024-01-13',
                    views: 305,
                    comments: 2,
                    status: '게시',
                    content: '중등 수학 학습자료입니다.'
                },
                {
                    id: 4,
                    board: '갤러리',
                    title: '2023 졸업식 사진',
                    author: '이영희',
                    createdDate: '2024-01-12',
                    views: 678,
                    comments: 15,
                    status: '게시',
                    content: '2023 졸업식 사진 모음입니다.'
                },
                {
                    id: 5,
                    board: '공지사항',
                    title: '개인정보처리방침 변경 안내',
                    author: '관리자',
                    createdDate: '2024-01-11',
                    views: 234,
                    comments: 1,
                    status: '숨김',
                    content: '개인정보처리방침이 변경되었습니다.'
                },
                {
                    id: 6,
                    board: '학원소식',
                    title: '신규 강사 소개',
                    author: '관리자',
                    createdDate: '2024-01-10',
                    views: 456,
                    comments: 7,
                    status: '게시',
                    content: '신규 강사를 소개합니다.'
                }
            ]
        };
    },
    computed: {
        filteredPosts() {
            return this.posts.filter(post => {
                const matchKeyword = post.title.includes(this.searchKeyword) ||
                                    post.content.includes(this.searchKeyword);
                const matchBoard = !this.filterBoard || post.board === this.filterBoard;
                const matchStatus = !this.filterStatus || post.status === this.filterStatus;
                return matchKeyword && matchBoard && matchStatus;
            });
        }
    },
    methods: {
        editPost(post) {
            this.currentPost = { ...post };
            this.showCreateModal = true;
        },
        deletePost(id) {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.posts = this.posts.filter(p => p.id !== id);
                alert('삭제되었습니다.');
            }
        },
        savePost() {
            if (!this.currentPost.board || !this.currentPost.title) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            if (this.currentPost.id) {
                // 수정
                const index = this.posts.findIndex(p => p.id === this.currentPost.id);
                if (index !== -1) {
                    this.posts[index] = { ...this.currentPost };
                }
                alert('수정되었습니다.');
            } else {
                // 등록
                this.currentPost.id = Date.now();
                this.currentPost.createdDate = new Date().toISOString().split('T')[0];
                this.currentPost.views = 0;
                this.currentPost.comments = 0;
                this.posts.unshift({ ...this.currentPost });
                alert('등록되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },
        resetForm() {
            this.currentPost = {
                id: null,
                board: '',
                title: '',
                content: '',
                status: '게시',
                author: '관리자'
            };
        },
        addBoard() {
            if (!this.newBoard.name.trim()) {
                alert('게시판 이름을 입력해주세요.');
                return;
            }
            if (!this.newBoard.type) {
                alert('유형을 선택해주세요.');
                return;
            }

            // 중복 체크
            if (this.boards.some(b => b.name === this.newBoard.name.trim())) {
                alert('이미 존재하는 게시판 이름입니다.');
                return;
            }

            this.boards.push({
                id: Date.now(),
                name: this.newBoard.name.trim(),
                type: this.newBoard.type
            });

            // 폼 초기화
            this.newBoard = { name: '', type: '' };
            alert('게시판이 추가되었습니다.');
        },
        startEditBoard(board) {
            this.editingBoardId = board.id;
            this.editBoard = { name: board.name, type: board.type };
        },
        saveEditBoard(boardId) {
            if (!this.editBoard.name.trim()) {
                alert('게시판 이름을 입력해주세요.');
                return;
            }
            if (!this.editBoard.type) {
                alert('유형을 선택해주세요.');
                return;
            }

            // 중복 체크 (자기 자신 제외)
            if (this.boards.some(b => b.id !== boardId && b.name === this.editBoard.name.trim())) {
                alert('이미 존재하는 게시판 이름입니다.');
                return;
            }

            const index = this.boards.findIndex(b => b.id === boardId);
            if (index !== -1) {
                const oldName = this.boards[index].name;
                this.boards[index].name = this.editBoard.name.trim();
                this.boards[index].type = this.editBoard.type;

                // 게시글의 게시판 이름도 업데이트
                this.posts.forEach(post => {
                    if (post.board === oldName) {
                        post.board = this.editBoard.name.trim();
                    }
                });

                alert('게시판이 수정되었습니다.');
            }

            this.editingBoardId = null;
            this.editBoard = { name: '', type: '' };
        },
        cancelEditBoard() {
            this.editingBoardId = null;
            this.editBoard = { name: '', type: '' };
        },
        deleteBoard(boardId) {
            const board = this.boards.find(b => b.id === boardId);
            if (!board) return;

            // 해당 게시판에 게시글이 있는지 확인
            const hasPost = this.posts.some(post => post.board === board.name);
            if (hasPost) {
                if (!confirm(`'${board.name}' 게시판에 게시글이 있습니다.\n게시판을 삭제하면 해당 게시글도 모두 삭제됩니다.\n정말 삭제하시겠습니까?`)) {
                    return;
                }
                // 해당 게시판의 게시글도 삭제
                this.posts = this.posts.filter(post => post.board !== board.name);
            } else {
                if (!confirm(`'${board.name}' 게시판을 삭제하시겠습니까?`)) {
                    return;
                }
            }

            this.boards = this.boards.filter(b => b.id !== boardId);
            alert('게시판이 삭제되었습니다.');
        }
    }
};
