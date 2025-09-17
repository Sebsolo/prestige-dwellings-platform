export interface ShowcaseItem {
  id: number;
  group_slug: string;
  location_label: string;
  price_label: string;
  detail_url: string;
  poster_bucket: string;
  poster_path: string;
  video_bucket: string;
  video_mp4_path?: string;
  video_webm_path?: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ShowcaseItemWithUrls extends ShowcaseItem {
  poster_url?: string;
  video_mp4_url?: string;
  video_webm_url?: string;
}

export interface LuxuryVideoShowcaseProps {
  groupSlug?: string;
  autoAdvanceInterval?: number;
  autoplay?: boolean;
  showProgressBars?: boolean;
  useSignedUrls?: boolean;
  className?: string;
}