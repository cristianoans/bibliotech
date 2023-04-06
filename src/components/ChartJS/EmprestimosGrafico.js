import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const EmprestimosGrafico = ({ emprestimos }) => {
  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const [totalVisible, setTotalVisible] = useState(false);

  useEffect(() => {
    if (!svgRef.current) {
      svgRef.current = d3.select(chartRef.current)
        .append('svg')
        .attr('width', 300)
        .attr('height', 300)
        .append('g')
        .attr('transform', `translate(150, 150)`);
    }
    drawChart();
  }, [emprestimos, totalVisible]);

  const drawChart = () => {
    const data = [
      { label: 'Pendentes', value: emprestimos.pendentes },
      { label: 'Devolvidos', value: emprestimos.devolvidos },
    ];

    const radius = 150;

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['#ffc107', '#198754']);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const data_ready = pie(data);

    svgRef.current.selectAll('path')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .append('title')
      .text(d => `${d.data.label}: ${d.data.value}`);

    if (emprestimos.pendentes && emprestimos.devolvidos) {
      const text = svgRef.current.selectAll('text.total')
        .data([emprestimos.total])
        .join('text')
        .classed('total', true)
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .text(`Total: ${emprestimos.total}`);

      if (!totalVisible) {
        text.attr('opacity', 0);
      } else {
        text.attr('opacity', 1);
      }
    }
  };

  const toggleTotal = () => {
    setTotalVisible(!totalVisible);
  };

  return (
    <div className='d-flex flex-column align-items-center card p-2'>
        <div><span>Empréstimos</span></div>
        <div className='d-flex mt-auto mb-auto' ref={chartRef} onClick={toggleTotal}></div>
        <div><i className="bi bi-circle-fill me-1 text-success"></i>Devolvidos: {emprestimos.devolvidos}</div>
        <div><i className="bi bi-circle-fill me-1 text-warning"></i>Pendentes: {emprestimos.pendentes}</div>
    </div>
    
  );
};

export default EmprestimosGrafico;
