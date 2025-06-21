

export type VulnerabilityReport = {
    id: string;
    kind: string;
    auditfirm_id: string;
    impact: 'MEDIUM' | 'HIGH' | 'LOW';
    finders_count: number;
    protocol_id: string;
    title: string;
    content: string;
    summary: string;
    report_date: string;
    contest_prize_txt: string;
    contest_link: string;
    sponsor_name: string | null;
    sponsor_link: string;
    quality_score: number;
    general_score: number;
    source_link: string;
    github_link: string;
    pdf_link: string;
    pdf_page_from: number;
    contest_id: string;
    slug: string;
    firm_name: string;
    firm_logo_square: string;
    protocol_name: string;
    search_order: number;
    bookmarked: boolean;
    read: boolean;
    issues_issue_finders: Array<{
      wardens_warden: {
        handle: string;
      };
    }>;
    auditfirms_auditfirm: {
      name: string;
      logo_square: string;
    };
    protocols_protocol: {
      name: string;
      protocols_protocolcategoryscore: any[];
    };
    issues_issuetagscore: any[];
  };