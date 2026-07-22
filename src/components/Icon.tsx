import {
  Home, Map, Camera, History, Bell, Search, ChevronRight, Shield, ShieldCheck,
  BadgeCheck, MapPin, Clock, Gavel, Bot, Link2, X, ArrowLeft, MoreVertical,
  PlusCircle, Download, Compass, Layers, Menu, LocateFixed, Globe, Share2,
  TrendingUp, SlidersHorizontal, TriangleAlert, Wifi, BatteryFull, Landmark,
  Sparkles, Building2, Database, Info, LogIn, BellOff, CircleCheck, CircleAlert,
  Timer, type LucideIcon,
} from "lucide-react";

/**
 * Maps the app's existing Material Symbols glyph names to Lucide icons, so
 * screens can migrate one span at a time:
 *   <span className="material-symbols-outlined">home</span>
 *   ->  <Icon name="home" size={22} />
 */
const map: Record<string, LucideIcon> = {
  home: Home,
  map: Map,
  photo_camera: Camera,
  history: History,
  notifications: Bell,
  notifications_paused: BellOff,
  search: Search,
  chevron_right: ChevronRight,
  shield: Shield,
  security: ShieldCheck,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  location_on: MapPin,
  my_location: LocateFixed,
  schedule: Clock,
  hourglass_top: Timer,
  gavel: Gavel,
  smart_toy: Bot,
  link: Link2,
  close: X,
  arrow_back: ArrowLeft,
  more_vert: MoreVertical,
  add_circle: PlusCircle,
  download: Download,
  explore: Compass,
  layers: Layers,
  menu: Menu,
  public: Globe,
  share: Share2,
  trending_up: TrendingUp,
  tune: SlidersHorizontal,
  warning: TriangleAlert,
  priority_high: CircleAlert,
  wifi: Wifi,
  battery_full: BatteryFull,
  account_balance: Landmark,
  corporate_fare: Building2,
  auto_awesome: Sparkles,
  database: Database,
  info: Info,
  login: LogIn,
  check_circle: CircleCheck,
  task_alt: CircleCheck,
};

export default function Icon({
  name,
  size = 22,
  className,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = map[name] ?? CircleAlert;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} />;
}
