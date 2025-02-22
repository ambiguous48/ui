import {
  toDuration,
  toDate,
  fromDate,
  isDurationString,
  isDurationKey,
  toString,
  isDuration,
} from './to-duration';

describe(toDuration, () => {
  it('should correctly parse "Last 10 minutes"', () => {
    expect(toDuration('Last 10 minutes')).toEqual({ minutes: 10 });
  });

  it('should correctly parse "Last 60 minutes"', () => {
    expect(toDuration('Last 60 minutes')).toEqual({ minutes: 60 });
  });

  it('should correctly parse "Last 3 hours"', () => {
    expect(toDuration('Last 3 hours')).toEqual({ hours: 3 });
  });

  it('should correctly parse "Last 24 hours"', () => {
    expect(toDuration('Last 24 hours')).toEqual({ hours: 24 });
  });

  it('should correctly parse "Last 3 days"', () => {
    expect(toDuration('Last 3 days')).toEqual({ days: 3 });
  });

  it('should correctly parse "Last 7 days"', () => {
    expect(toDuration('Last 7 days')).toEqual({ days: 7 });
  });

  it('should correctly parse "Last 30 days"', () => {
    expect(toDuration('Last 30 days')).toEqual({ days: 30 });
  });

  it('should correctly parse "Last 3 months"', () => {
    expect(toDuration('Last 3 months')).toEqual({ months: 3 });
  });

  it('should correctly parse "10 minutes"', () => {
    expect(toDuration('10 minutes')).toEqual({ minutes: 10 });
  });

  it('should correctly parse "60 minutes"', () => {
    expect(toDuration('60 minutes')).toEqual({ minutes: 60 });
  });

  it('should correctly parse "3 hours"', () => {
    expect(toDuration('3 hours')).toEqual({ hours: 3 });
  });

  it('should correctly parse "24 hours"', () => {
    expect(toDuration('24 hours')).toEqual({ hours: 24 });
  });

  it('should correctly parse "3 days"', () => {
    expect(toDuration('3 days')).toEqual({ days: 3 });
  });

  it('should correctly parse "7 days"', () => {
    expect(toDuration('7 days')).toEqual({ days: 7 });
  });

  it('should correctly parse "30 days"', () => {
    expect(toDuration('30 days')).toEqual({ days: 30 });
  });

  it('should correctly parse "3 months"', () => {
    expect(toDuration('3 months')).toEqual({ months: 3 });
  });
});

describe(toDate, () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should produce a date based on a duration', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const ninetyDaysEarlier = '2019-10-03T00:00:00Z';

    const result = toDate({ days: 90 });
    expect(result).toBe(ninetyDaysEarlier);
  });

  it('should produce a date based on a duration string', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const ninetyDaysEarlier = '2019-10-03T00:00:00Z';

    const result = toDate('90 days');
    expect(result).toBe(ninetyDaysEarlier);
  });
});

describe(fromDate, () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should produce a duration based on a 2 years in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const twoYearsEarlier = '2018-01-01T00:00:00Z';

    const result = fromDate(twoYearsEarlier);
    expect(result).toEqual({ years: 2 });
  });

  it('should produce a duration based on a 90 days in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const ninetyDaysEarlier = '2019-10-03T00:00:00Z';

    const result = fromDate(ninetyDaysEarlier);
    expect(result).toEqual({ days: 90 });
  });

  it('should produce a duration based on a 60 days in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const sixtyDaysEarlier = '2019-11-02T00:00:00Z';

    const result = fromDate(sixtyDaysEarlier);
    expect(result).toEqual({ days: 60 });
  });

  it('should produce a duration based on 23 hours in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const twentyThreeHoursEarlier = '2019-12-31T01:00:00Z';

    const result = fromDate(twentyThreeHoursEarlier);
    expect(result).toEqual({ hours: 23 });
  });

  it('should produce a duration based on 30 minutes in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const thirtyMinutesEarlier = '2019-12-31T23:30:00Z';

    const result = fromDate(thirtyMinutesEarlier);
    expect(result).toEqual({ minutes: 30 });
  });

  it('should produce a duration based on 10 seconds in the past', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
    const tenSecondsEarlier = '2019-12-31T23:59:50Z';

    const result = fromDate(tenSecondsEarlier);
    expect(result).toEqual({ seconds: 10 });
  });
});

describe(isDuration, () => {
  it('should return false if given null', () => {
    expect(isDuration(null)).toBe(false);
  });

  it('should return false if given an object with an invalid key', () => {
    expect(isDuration({ invalid: 4 })).toBe(false);
  });

  it('should return true if given an object with an valid key', () => {
    expect(isDuration({ years: 4 })).toBe(true);
  });
});

describe(isDurationKey, () => {
  it('should return false if given a number', () => {
    expect(isDurationKey(2)).toBe(false);
  });

  it('should return false if given a boolean', () => {
    expect(isDurationKey(true)).toBe(false);
  });

  it('should return false if given an object', () => {
    expect(isDurationKey({})).toBe(false);
  });

  it('should return false if given an array', () => {
    expect(isDurationKey([])).toBe(false);
  });

  it('should return true if given "years" as a duration key', () => {
    expect(isDurationKey('years')).toBe(true);
  });

  it('should return true if given "months" as a duration key', () => {
    expect(isDurationKey('months')).toBe(true);
  });

  it('should return true if given "weeks" as a duration key', () => {
    expect(isDurationKey('weeks')).toBe(true);
  });

  it('should return true if given "days" as a duration key', () => {
    expect(isDurationKey('days')).toBe(true);
  });

  it('should return true if given "hours" as a duration key', () => {
    expect(isDurationKey('hours')).toBe(true);
  });

  it('should return true if given "minutes" as a duration key', () => {
    expect(isDurationKey('minutes')).toBe(true);
  });

  it('should return true if given "seconds" as a duration key', () => {
    expect(isDurationKey('seconds')).toBe(true);
  });

  it('should return false if given an invalid string', () => {
    expect(isDurationKey('not valid')).toBe(false);
  });
});

describe(isDurationString, () => {
  it('should return true for "24 hours"', () => {
    expect(isDurationString('24 hours')).toBe(true);
  });

  it('should return false for null', () => {
    expect(isDurationString(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isDurationString(undefined)).toBe(false);
  });

  it('should return false for "undefined"', () => {
    expect(isDurationString('undefined')).toBe(false);
  });
});

describe(toString, () => {
  it('should correctly format 3 years', () => {
    expect(toString({ years: 3 })).toBe('3 years');
  });

  it('should correctly format 3 months', () => {
    expect(toString({ months: 3 })).toBe('3 months');
  });

  it('should correctly format 3 weeks', () => {
    expect(toString({ weeks: 3 })).toBe('3 weeks');
  });

  it('should correctly format 3 days', () => {
    expect(toString({ days: 3 })).toBe('3 days');
  });

  it('should correctly format 3 hours', () => {
    expect(toString({ hours: 3 })).toBe('3 hours');
  });

  it('should correctly format 3 minutes', () => {
    expect(toString({ minutes: 3 })).toBe('3 minutes');
  });

  it('should correctly format 3 seconds', () => {
    expect(toString({ seconds: 3 })).toBe('3 seconds');
  });

  it('should correctly format 1 year', () => {
    expect(toString({ years: 1 })).toBe('1 year');
  });

  it('should correctly format 1 month', () => {
    expect(toString({ months: 1 })).toBe('1 month');
  });

  it('should correctly format 1 week', () => {
    expect(toString({ weeks: 1 })).toBe('1 week');
  });

  it('should correctly format 1 day', () => {
    expect(toString({ days: 1 })).toBe('1 day');
  });

  it('should correctly format 1 hour', () => {
    expect(toString({ hours: 1 })).toBe('1 hour');
  });

  it('should correctly format 1 minute', () => {
    expect(toString({ minutes: 1 })).toBe('1 minute');
  });

  it('should correctly format 1 second', () => {
    expect(toString({ seconds: 1 })).toBe('1 second');
  });
});
