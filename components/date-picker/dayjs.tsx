import type { Dayjs } from 'dayjs';
import type { App } from 'vue';
import dayjsGenerateConfig from '../vc-picker/generate/dayjs';
import type {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';
import generatePicker from './generatePicker';
import { ExtraDatePickerProps, ExtraRangePickerProps } from './generatePicker/props';

export type DatePickerProps = PickerProps<Dayjs> & ExtraDatePickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type RangePickerProps = BaseRangePickerProps<Dayjs> & ExtraRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;
const WeekPicker = DatePicker.WeekPicker;
const QuarterPicker = DatePicker.QuarterPicker;

/* istanbul ignore next */
DatePicker.install = function (app: App) {
  app.component(DatePicker.name, DatePicker);
  app.component(RangePicker.name, RangePicker);
  app.component(MonthPicker.name, MonthPicker);
  app.component(WeekPicker.name, WeekPicker);
  app.component(QuarterPicker.name, QuarterPicker);
  return app;
};

export { RangePicker, WeekPicker, MonthPicker, QuarterPicker };

export default DatePicker as typeof DatePicker & Plugin;
