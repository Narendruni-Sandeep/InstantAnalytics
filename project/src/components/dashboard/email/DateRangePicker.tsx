import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import { DateRange, Range } from 'react-date-range';
import { format, subDays } from 'date-fns';
import { useTheme } from '../../../hooks/useTheme';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
}

const staticRanges = [
  {
    label: 'Today',
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: 'Last 7 days',
    range: () => ({
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    }),
  },
  {
    label: 'Last 30 days',
    range: () => ({
      startDate: subDays(new Date(), 29),
      endDate: new Date(),
    }),
  },
  {
    label: 'Last 3 months',
    range: () => ({
      startDate: subDays(new Date(), 89),
      endDate: new Date(),
    }),
  },
  {
    label: 'Last 12 months',
    range: () => ({
      startDate: subDays(new Date(), 364),
      endDate: new Date(),
    }),
  },
];

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (ranges: Range) => {
    if (ranges.selection.startDate && ranges.selection.endDate) {
      onChange({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
      });
    }
  };

  const handleStaticRangeClick = (range: () => { startDate: Date; endDate: Date }) => {
    const { startDate: newStart, endDate: newEnd } = range();
    onChange({ startDate: newStart, endDate: newEnd });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-input text-foreground hover:bg-accent transition-colors"
      >
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span>
          {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 z-50"
          >
            <div className="p-4 rounded-lg bg-card border border-border shadow-lg">
              <div className="flex">
                <div className="border-r border-border">
                  <div className="p-2 space-y-1">
                    {staticRanges.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleStaticRangeClick(item.range)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <DateRange
                  ranges={[{
                    startDate,
                    endDate,
                    key: 'selection'
                  }]}
                  onChange={handleSelect}
                  months={2}
                  direction="horizontal"
                  showDateDisplay={false}
                  rangeColors={[theme === 'dark' ? '#7c3aed' : '#8b5cf6']}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}