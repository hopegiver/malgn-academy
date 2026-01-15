export default {
    data() {
        return {
            period: 'month',
            filters: {
                category: ''
            },
            monthlyRevenue: [
                { month: '2026-01', total: 52500000, collected: 48300000, unpaid: 4200000, collectionRate: 92, growth: 12.4 },
                { month: '2025-12', total: 46700000, collected: 42800000, unpaid: 3900000, collectionRate: 91, growth: 8.5 },
                { month: '2025-11', total: 43000000, collected: 39200000, unpaid: 3800000, collectionRate: 91, growth: 5.2 },
                { month: '2025-10', total: 40900000, collected: 37500000, unpaid: 3400000, collectionRate: 92, growth: 7.8 },
                { month: '2025-09', total: 37900000, collected: 34800000, unpaid: 3100000, collectionRate: 92, growth: 15.2 },
                { month: '2025-08', total: 32900000, collected: 29800000, unpaid: 3100000, collectionRate: 91, growth: 3.8 }
            ],
            categoryRevenue: [
                { name: '수강료', amount: 44250000, ratio: 84, collectionRate: 93 },
                { name: '교재비', amount: 4200000, ratio: 8, collectionRate: 95 },
                { name: '특강', amount: 3150000, ratio: 6, collectionRate: 88 },
                { name: '기타', amount: 900000, ratio: 2, collectionRate: 90 }
            ],
            gradeRevenue: [
                { name: '초등부', students: 45, revenue: 13500000, avgPerStudent: 300000, collectionRate: 94 },
                { name: '중등부', students: 58, revenue: 23200000, avgPerStudent: 400000, collectionRate: 92 },
                { name: '고등부', students: 42, revenue: 18900000, avgPerStudent: 450000, collectionRate: 90 }
            ]
        };
    },

    computed: {
        stats() {
            const current = this.monthlyRevenue[0];
            return {
                currentRevenue: current.total,
                collectionRate: current.collectionRate,
                unpaid: current.unpaid,
                growthRate: current.growth
            };
        }
    },

    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
            }).format(value);
        },

        handlePeriodChange() {
            // 기간 변경 처리
            console.log('기간 변경:', this.period);

            // 실제로는 API 호출하여 데이터 갱신
            switch (this.period) {
                case 'month':
                    this.monthlyRevenue = [
                        { month: '2026-01', total: 52500000, collected: 48300000, unpaid: 4200000, collectionRate: 92, growth: 12.4 }
                    ];
                    break;
                case 'quarter':
                    this.monthlyRevenue = [
                        { month: '2026-01', total: 52500000, collected: 48300000, unpaid: 4200000, collectionRate: 92, growth: 12.4 },
                        { month: '2025-12', total: 46700000, collected: 42800000, unpaid: 3900000, collectionRate: 91, growth: 8.5 },
                        { month: '2025-11', total: 43000000, collected: 39200000, unpaid: 3800000, collectionRate: 91, growth: 5.2 }
                    ];
                    break;
                case 'half':
                    this.monthlyRevenue = [
                        { month: '2026-01', total: 52500000, collected: 48300000, unpaid: 4200000, collectionRate: 92, growth: 12.4 },
                        { month: '2025-12', total: 46700000, collected: 42800000, unpaid: 3900000, collectionRate: 91, growth: 8.5 },
                        { month: '2025-11', total: 43000000, collected: 39200000, unpaid: 3800000, collectionRate: 91, growth: 5.2 },
                        { month: '2025-10', total: 40900000, collected: 37500000, unpaid: 3400000, collectionRate: 92, growth: 7.8 },
                        { month: '2025-09', total: 37900000, collected: 34800000, unpaid: 3100000, collectionRate: 92, growth: 15.2 },
                        { month: '2025-08', total: 32900000, collected: 29800000, unpaid: 3100000, collectionRate: 91, growth: 3.8 }
                    ];
                    break;
                case 'year':
                    this.monthlyRevenue = [
                        { month: '2026-01', total: 52500000, collected: 48300000, unpaid: 4200000, collectionRate: 92, growth: 12.4 },
                        { month: '2025-12', total: 46700000, collected: 42800000, unpaid: 3900000, collectionRate: 91, growth: 8.5 },
                        { month: '2025-11', total: 43000000, collected: 39200000, unpaid: 3800000, collectionRate: 91, growth: 5.2 },
                        { month: '2025-10', total: 40900000, collected: 37500000, unpaid: 3400000, collectionRate: 92, growth: 7.8 },
                        { month: '2025-09', total: 37900000, collected: 34800000, unpaid: 3100000, collectionRate: 92, growth: 15.2 },
                        { month: '2025-08', total: 32900000, collected: 29800000, unpaid: 3100000, collectionRate: 91, growth: 3.8 },
                        { month: '2025-07', total: 31700000, collected: 28600000, unpaid: 3100000, collectionRate: 90, growth: 2.4 },
                        { month: '2025-06', total: 30950000, collected: 28200000, unpaid: 2750000, collectionRate: 91, growth: 6.8 },
                        { month: '2025-05', total: 28970000, collected: 26500000, unpaid: 2470000, collectionRate: 91, growth: 8.3 },
                        { month: '2025-04', total: 26750000, collected: 24300000, unpaid: 2450000, collectionRate: 91, growth: 11.5 },
                        { month: '2025-03', total: 23990000, collected: 21800000, unpaid: 2190000, collectionRate: 91, growth: 15.7 },
                        { month: '2025-02', total: 20730000, collected: 18900000, unpaid: 1830000, collectionRate: 91, growth: 8.2 }
                    ];
                    break;
            }
        },

        handleFilter() {
            // 필터 처리
            console.log('필터 변경:', this.filters.category);

            // 실제로는 필터에 맞는 데이터로 갱신
            if (this.filters.category) {
                // 선택된 카테고리만 표시
                this.categoryRevenue = this.categoryRevenue.filter(c => {
                    const categoryMap = {
                        'tuition': '수강료',
                        'material': '교재비',
                        'event': '특강',
                        'etc': '기타'
                    };
                    return c.name === categoryMap[this.filters.category];
                });
            } else {
                // 전체 표시
                this.categoryRevenue = [
                    { name: '수강료', amount: 44250000, ratio: 84, collectionRate: 93 },
                    { name: '교재비', amount: 4200000, ratio: 8, collectionRate: 95 },
                    { name: '특강', amount: 3150000, ratio: 6, collectionRate: 88 },
                    { name: '기타', amount: 900000, ratio: 2, collectionRate: 90 }
                ];
            }
        },

        exportReport() {
            alert('매출 보고서를 다운로드합니다.');
            // 실제로는 PDF 또는 Excel 파일 생성 및 다운로드
        }
    },

    mounted() {
        console.log('매출 분석 페이지 로드됨');
    }
};
