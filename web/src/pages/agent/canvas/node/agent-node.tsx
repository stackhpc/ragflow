import { IAgentNode } from '@/interfaces/database/flow';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { memo, useMemo } from 'react';
import { NodeHandleId, Operator } from '../../constant';
import useGraphStore from '../../store';
import { CommonHandle } from './handle';
import { LeftHandleStyle, RightHandleStyle } from './handle-icon';
import styles from './index.less';
import NodeHeader from './node-header';
import { NodeWrapper } from './node-wrapper';
import { ToolBar } from './toolbar';

function InnerAgentNode({
  id,
  data,
  isConnectable = true,
  selected,
}: NodeProps<IAgentNode>) {
  const getNode = useGraphStore((state) => state.getNode);
  const edges = useGraphStore((state) => state.edges);

  const isNotParentAgent = useMemo(() => {
    const edge = edges.find((x) => x.target === id);
    const label = getNode(edge?.source)?.data.label;
    return label !== Operator.Agent;
  }, [edges, getNode, id]);

  return (
    <ToolBar selected={selected} id={id} label={data.label}>
      <NodeWrapper>
        {isNotParentAgent && (
          <>
            <CommonHandle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              style={LeftHandleStyle}
              nodeId={id}
              id={NodeHandleId.End}
            ></CommonHandle>
            <CommonHandle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className={styles.handle}
              style={RightHandleStyle}
              nodeId={id}
              id={NodeHandleId.Start}
              isConnectableEnd={false}
            ></CommonHandle>
          </>
        )}
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={false}
          id="f"
        ></Handle>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={false}
          id="e"
          style={{ left: 180 }}
        ></Handle>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={false}
          id={NodeHandleId.Tool}
          style={{ left: 20 }}
        ></Handle>
        <NodeHeader id={id} name={data.name} label={data.label}></NodeHeader>
      </NodeWrapper>
    </ToolBar>
  );
}

export const AgentNode = memo(InnerAgentNode);
